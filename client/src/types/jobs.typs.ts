export type JobStatus = "pending" | "resolved" | "failed";

export const JOB_STATUS_PENDING = "pending";
export const JOB_STATUS_RESOLVED = "resolved";
export const JOB_STATUS_FAILED = "failed";

export interface Job {
  id: string;
  status: JobStatus;
  createdAt: number;
  result: string;
  error?: string;
}
