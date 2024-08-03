import {
  JOB_STATUS_FAILED,
  JOB_STATUS_PENDING,
  JOB_STATUS_RESOLVED,
  Job,
  JobStatus,
} from "@/types";
import { FC } from "react";

type JobStatuses = {
  [key in JobStatus]: string;
};

const statuses: JobStatuses = {
  [JOB_STATUS_RESOLVED]: "text-green-700 bg-green-50 ring-green-600/20",
  [JOB_STATUS_PENDING]: "text-gray-600 bg-gray-50 ring-gray-500/10",
  [JOB_STATUS_FAILED]: "text-red-700 bg-red-50 ring-red-600/20",
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface JobsListProps {
  jobs: Job[];
}

export const JobsList: FC<JobsListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No jobs found</p>
      </div>
    );
  }
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {jobs.map((job) => (
        <li key={job.id} className="gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {job.id}
              </p>
              <p
                className={classNames(
                  statuses[job.status],
                  "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {job.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Due on{" "}
                <time dateTime={new Date(job.createdAt).toISOString()}>
                  {new Date(job.createdAt).toLocaleDateString()}{" "}
                  {new Date(job.createdAt).toLocaleTimeString()}
                </time>
              </p>
            </div>
          </div>
          <div className="mt-4">
            {job.status === JOB_STATUS_RESOLVED && (
              <img src={job.result} alt="result" className="h-24 w-24" />
            )}
            {job.status === JOB_STATUS_FAILED && (
              <p className="text-red-700 text-sm">{job.error}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
