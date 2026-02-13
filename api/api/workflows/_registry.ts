// api/workflows/_registry.ts

export type Workflow = {
  id: string;
  name: string;
  description?: string;
  approvalMode: "auto" | "suggest" | "required";
  steps: any[];
};

export const WORKFLOWS: Workflow[] = [
  {
    id: "weekly_ops_report",
    name: "Weekly Ops Report",
    description:
      "Generate a weekly ops summary for revenue, sessions, compliance, and risks.",
    approvalMode: "suggest",
    steps: [
      {
        type: "ai",
        prompt:
          "You are Ruffbot COO. Draft a weekly ops report with revenue estimate, session volume, cancellations/no-shows, compliance items due, top risks, and next-week priorities.",
      },
      {
        type: "wait_approval",
        message: "Approve to finalize workflow.",
      },
    ],
  },
];

export function getWorkflowById(id: string) {
  return WORKFLOWS.find((w) => w.id === id);
}
