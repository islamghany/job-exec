import { logger } from "@/foundation/logger";
import { Response, NextFunction, Request } from "express";

export const loggerStartMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = req.url;
  const method = req.method;
  logger.info("request started", {
    method,
    url,
    remoteAddress: req.connection.remoteAddress,
  });
  // inject the start time in the request object
  req.startTime = Date.now();
  next();
};

export const loggerEndMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = req.url;
  const method = req.method;
  const statusCode = res.statusCode;
  const responseTime = Date.now() - req.startTime;
  logger.info(
    "request ended",
    {
      method,
      url,
      remoteAddress: req.connection.remoteAddress,
      statusCode,
      responseTime: `${responseTime}ms`,
    },
    { service: "jobs-service" }
  );
  next();
};
