import { Router } from "express";
import { jobHandler, listJobsHandler, createJobHandler } from "./jobs.handlers";

const jobsRoutes = Router();

jobsRoutes.route("").get(listJobsHandler).post(createJobHandler);
jobsRoutes.route("/:id").get(jobHandler);

export { jobsRoutes };
