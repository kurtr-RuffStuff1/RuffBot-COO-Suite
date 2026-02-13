// api/workflows/index.ts
import { WORKFLOWS } from "./_registry";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({
    workflows: WORKFLOWS.map((w) => ({
      id: w.id,
      name: w.name,
      description: w.description,
      approvalMode: w.approvalMode,
      stepCount: w.steps.length,
    })),
  });
}
