import { Job as JobMQ } from "bullmq";
import { JOB_STATUS_RESOLVED, Job } from "@/foundation/types";
import axios from "axios";
import { readJobs, writeJobs } from "../data/jobs.data";
import { NUMBER_OF_ATTEMPTS } from ".";
import { logger } from "@/foundation/logger";

// JobProcessor class with a that responsible for processing the job lifecycle
export class JobProcessor {
  // createJob method that resolves the job and updates the job status
  static async createJob(job: JobMQ<Job>) {
    const newJob = job.data;
    const res = (await axios.get("https://picsum.photos/200/300")) as any;
    newJob.result = res.request.res.responseUrl;
    newJob.status = JOB_STATUS_RESOLVED;
    const jobs = await readJobs();
    const newJobs = jobs.map((job) => {
      if (job.id === newJob.id) {
        return newJob;
      }
      return job;
    });
    logger.info("Job resolved", {
      id: newJob.id,
      result: newJob.result,
    });
    await writeJobs(newJobs);
  }
  // jobFailed method that logs the error and updates the job status
  static async jobFailed(
    job: JobMQ<Job, any, string> | undefined,
    value: Error,
    prev: string
  ) {
    // don't retry if the job has been attempted NUMBER_OF_ATTEMPTS times
    if (!job?.data || job?.attemptsMade < NUMBER_OF_ATTEMPTS) {
      return;
    }
    logger.error("Job failed", {
      id: job.data.id,
      error: value.message,
    });
    const newJob = job?.data;
    newJob.status = "failed";
    newJob.error = value.message;
    const jobs = await readJobs();
    const newJobs = jobs.map((job) => {
      if (job.id === newJob.id) {
        return newJob;
      }
      return job;
    });
    await writeJobs(newJobs);
  }
}
