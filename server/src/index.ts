import cors from "cors";
import express from "express";
import "dotenv/config";
import { jobsRoutes } from "@/apis/jobs/jobs.routes";
import { errorsMiddleware } from "./business/mid/errors.mid";

import {
  loggerEndMiddleware,
  loggerStartMiddleware,
} from "./business/mid/logger.mid";
import { QueueService } from "./business/services/queue.services";

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerStartMiddleware);
app.use("/v1/jobs", jobsRoutes);
app.use(errorsMiddleware);
app.use(loggerEndMiddleware);

const server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

// handling graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully");
  // close the server
  server.close(() => {
    console.log("Server closed");
    // closing the bullmq queues
    QueueService.shutdown()
      .then(() => {
        console.log("Queues closed");
        process.exit(0);
      })
      .catch((err) => {
        console.error("Error closing queues", err);
        process.exit(1);
      });
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
