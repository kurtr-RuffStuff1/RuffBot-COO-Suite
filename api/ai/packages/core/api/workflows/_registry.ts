// api/workflows/_registry.ts
import type { Workflow } from "../../packages/core/workflows";

export const WORKFLOWS: Workflow[] = [
  {
    id: "weekly_ops_report",
    name: "Weekly Ops Report",
    description: "Generate a weekly ops summary for revenue, sessions, compliance, and risks.",
    approvalMode: "suggest",
    steps: [
      {
        type: "ai",
        prompt:
          "You are Ruffbot COO. Draft a weekly ops report with: revenue estimate, session volume, cancellations/no-shows, compliance items due, top risks, and next-week priorities. Keep it concise and actionable.",
      },
      {
        type: "wait_approval",
        message:
          "Approve to post this report to the dashboard (future) or send to email/Slack (future). For now, approval just marks the run complete.",
      },
    ],
  },
  {
    id: "sop_review_queue",
    name: "SOP Review Queue",
    description: "Create a list of SOPs that need review (stub until SOP storage is wired).",
    approvalMode: "auto",
    steps: [{ type: "noop", message: "SOP review queue generation not yet wired." }],
  },
];

export function getWorkflowById(id: string) {
  return WORKFLOWS.find((w) => w.id === id);
}
