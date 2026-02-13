// packages/core/workflows.ts

export type ApprovalMode = "auto" | "suggest" | "required";

export type WorkflowStep =
  | { type: "ai"; prompt: string }
  | { type: "wait_approval"; message: string }
  | { type: "noop"; message: string };

export type Workflow = {
  id: string;
  name: string;
  description?: string;
  approvalMode: ApprovalMode;
  steps: WorkflowStep[];
};

export type WorkflowRunResult = {
  runId: string;
  workflowId: string;
  status: "succeeded" | "waiting_approval" | "failed";
  logs: Array<{ ts: string; level: "info" | "warn" | "error"; message: string; data?: any }>;
  output?: any;
};
