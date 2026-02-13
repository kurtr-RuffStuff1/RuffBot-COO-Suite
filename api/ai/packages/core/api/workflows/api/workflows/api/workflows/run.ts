// api/workflows/run.ts
import { getWorkflowById } from "./_registry";
import type { WorkflowRunResult } from "../../packages/core/workflows";

function nowIso() {
  return new Date().toISOString();
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { workflowId, input, approved } = req.body || {};
    if (!workflowId) return res.status(400).json({ error: "Missing workflowId" });

    const wf = getWorkflowById(workflowId);
    if (!wf) return res.status(404).json({ error: "Workflow not found" });

    const runId = `run_${workflowId}_${Date.now()}`;

    const logs: WorkflowRunResult["logs"] = [];
    const log = (level: "info" | "warn" | "error", message: string, data?: any) => {
      logs.push({ ts: nowIso(), level, message, data });
    };

    log("info", "Workflow run started", { workflowId, approvalMode: wf.approvalMode });

    let aiText: string | undefined;

    for (let i = 0; i < wf.steps.length; i++) {
      const step = wf.steps[i];

      if (step.type === "noop") {
        log("info", `Step ${i + 1}: noop`, { message: step.message });
        continue;
      }

      if (step.type === "ai") {
        log("info", `Step ${i + 1}: ai`, { promptPreview: step.prompt.slice(0, 120) });

        // Call your secure Step-1 endpoint internally (same Vercel deployment)
        // Build an absolute URL for serverless runtime:
        const origin =
          req.headers["x-forwarded-proto"] && req.headers["x-forwarded-host"]
            ? `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}`
            : "";

        const resp = await fetch(`${origin}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "user", text: step.prompt },
              ...(input?.contextMessages || []),
            ],
          }),
        });

        const data = await resp.json();
        aiText = data?.text || "";
        log("info", "AI step completed", { textPreview: aiText.slice(0, 200) });
        continue;
      }

      if (step.type === "wait_approval") {
        log("info", `Step ${i + 1}: wait_approval`, { message: step.message });

        if (wf.approvalMode === "auto") {
          log("info", "Approval skipped (auto mode)");
          continue;
        }

        if (!approved) {
          const result: WorkflowRunResult = {
            runId,
            workflowId,
            status: "waiting_approval",
            logs,
            output: { draft: aiText, approvalMessage: step.message },
          };
          return res.status(200).json(result);
        }

        log("info", "Approval received; continuing");
        continue;
      }
    }

    const result: WorkflowRunResult = {
      runId,
      workflowId,
      status: "succeeded",
      logs,
      output: { result: aiText },
    };

    return res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Workflow run failed", detail: String(err?.message || err) });
  }
}
