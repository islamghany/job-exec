import { Job, Queue, QueueOptions, Worker } from "bullmq";
import { ProcessorType, JobProcessor } from "@/business/processors";

// available queues
export const QUEUES = {
  JOBS: "jobs",
};

export class QueueService {
  private queues: Record<string, Queue> = {};
  private jobsQueue: Queue | null = null;
  private jobsQueueWorker: Worker | null = null;
  // singleton pattern to ensure only one instance of the QueueService can exists in the application
  // providing a global point of access to the queue management functionality.
  private static instance: QueueService;

  private static QUEUE_OPTIONS: QueueOptions = {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD,
    },
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
  };
  constructor() {
    if (QueueService.instance instanceof QueueService) {
      return QueueService.instance;
    }
    this.queues = {};
    QueueService.instance = this;
    this.instantiateQueues();
    this.instantiateWorkers();
  }
  // instantiate the queues
  async instantiateQueues() {
    this.jobsQueue = new Queue(QUEUES.JOBS, QueueService.QUEUE_OPTIONS);
    this.queues[QUEUES.JOBS] = this.jobsQueue;
  }

  getQueue(queueName: string) {
    return this.queues[queueName];
  }

  // register a worker for each queue
  async instantiateWorkers() {
    this.jobsQueueWorker = new Worker(
      QUEUES.JOBS,
      async (job) => {
        switch (job.name) {
          case ProcessorType.CREATE_JOB:
            await JobProcessor.createJob(job);
            break;
          default:
            break;
        }
      },
      {
        connection: QueueService.QUEUE_OPTIONS.connection,
        removeOnFail: {
          count: 0,
        },
        removeOnComplete: {
          count: 0,
        },
      }
    );
    this.jobsQueueWorker.on(
      "failed",
      (job: Job<any, any, string> | undefined, value: Error, prev: string) => {
        JobProcessor.jobFailed(job, value, prev);
      }
    );
  }

  public static shutdown = async () => {
    if (QueueService.instance instanceof QueueService) {
      await QueueService.instance.jobsQueueWorker?.close();
      await QueueService.instance.jobsQueue?.close();
    }
  };
}
