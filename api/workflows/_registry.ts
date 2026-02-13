export type Workflow = {
  id: string;
  name: string;
  description?: string;
  approvalMode: "auto" | "suggest" | "required";
  steps: Array<
    | { type: "ai"; prompt: string }
    | { type: "wait_approval"; message: string }
    | { type: "noop"; message: string }
  >;
};

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
          "You are Ruffbot COO. Draft a weekly ops report with revenue estimate, session volume, cancellations/no-shows, compliance due, top risks, and next-week priorities. Concise and actionable.",
      },
      { type: "wait_approval", message: "Approve to finalize." },
    ],
  },
];

export function getWorkflowById(id: string) {
  return WORKFLOWS.find((w) => w.id === id);
}
