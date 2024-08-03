import { readJobs, writeJobs } from "@/business/data/jobs.data";
import { NUMBER_OF_ATTEMPTS, ProcessorType } from "@/business/processors";
import { QueueService } from "@/business/services/queue.services";
import { NotFoundException } from "@/foundation/error";
import { logger } from "@/foundation/logger";
import { JOB_STATUS_PENDING, Job } from "@/foundation/types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

export const listJobsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobs = await readJobs();
  res.json(jobs?.reverse());
  next();
};

export const jobHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobs = await readJobs();
  const job = jobs.find((job) => job.id === req.params.id);
  if (!job) {
    return next(
      new NotFoundException(`Job with id ${req.params.id} not found`)
    );
  } else {
    res.json(job);
    next();
  }
};

export const createJobHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobs = await readJobs();
  const newJob: Job = {
    id: uuidv4(),
    status: JOB_STATUS_PENDING,
    createdAt: Date.now(),
    result: "",
  };
  jobs.push(newJob);
  await writeJobs(jobs);
  res.status(StatusCodes.CREATED).json(newJob);

  //delay the job creation by a random amount of time between 5s and 5m with 5s increments
  let delay = Math.floor(Math.random() * 60) + 1;
  delay *= 5000;

  logger.info("Job created", {
    id: newJob.id,
    delay: delay,
  });
  const queue = new QueueService().getQueue("jobs");
  queue?.add(ProcessorType.CREATE_JOB, newJob, {
    delay: delay,
    attempts: NUMBER_OF_ATTEMPTS,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  });
  next();
};
