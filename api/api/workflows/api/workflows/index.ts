import { WORKFLOWS } from "./_registry";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  res.status(200).json({
    workflows: WORKFLOWS.map((w) => ({
      id: w.id,
      name: w.name,
      description: w.description,
      approvalMode: w.approvalMode,
      stepCount: w.steps.length,
    })),
  });
}
