import { getWorkflowById } from "./_registry";

function nowIso() {
  return new Date().toISOString();
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { workflowId, input, approved } = req.body || {};
    if (!workflowId) return res.status(400).json({ error: "Missing workflowId" });

    const wf = getWorkflowById(workflowId);
    if (!wf) return res.status(404).json({ error: "Workflow not found" });

    const runId = `run_${workflowId}_${Date.now()}`;
    const logs: any[] = [];
    const log = (level: "info" | "warn" | "error", message: string, data?: any) =>
      logs.push({ ts: nowIso(), level, message, data });

    log("info", "Workflow run started", { workflowId, approvalMode: wf.approvalMode });

    let aiText: string | undefined;

    for (let i = 0; i < wf.steps.length; i++) {
      const step = wf.steps[i];

      if (step.type === "noop") {
        log("info", `Step ${i + 1}: noop`, { message: step.message });
        continue;
      }

      if (step.type === "ai") {
        const host = req.headers["x-forwarded-host"] || req.headers.host;
        const proto = req.headers["x-forwarded-proto"] || "https";
        const origin = `${proto}://${host}`;

        log("info", `Step ${i + 1}: ai`, { promptPreview: step.prompt.slice(0, 120) });

        const resp = await fetch(`${origin}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "user", text: step.prompt }], input }),
        });

        const data = await resp.json();
        aiText = data?.text || "";
        log("info", "AI step completed", { textPreview: aiText.slice(0, 200) });
        continue;
      }

      if (step.type === "wait_approval") {
        log("info", `Step ${i + 1}: wait_approval`, { message: step.message });

        if (wf.approvalMode !== "auto" && !approved) {
          return res.status(200).json({
            runId,
            workflowId,
            status: "waiting_approval",
            logs,
            output: { draft: aiText, approvalMessage: step.message },
          });
        }

        log("info", "Approval received; continuing");
      }
    }

    return res.status(200).json({
      runId,
      workflowId,
      status: "succeeded",
      logs,
      output: { result: aiText },
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Workflow run failed", detail: String(err?.message || err) });
  }
}
