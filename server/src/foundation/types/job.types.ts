export type JobStatus = "pending" | "resolved" | "failed";
export const JOB_STATUS_PENDING: JobStatus = "pending";
export const JOB_STATUS_RESOLVED: JobStatus = "resolved";
export const JOB_STATUS_FAILED: JobStatus = "failed";

export interface Job {
  id: string;
  status: JobStatus;
  createdAt: number;
  result: string;
  error?: string;
}
