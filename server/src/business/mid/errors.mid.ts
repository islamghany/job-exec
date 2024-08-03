import { Request, Response, NextFunction } from "express";
import { HTTPException } from "@/foundation/error";
import { StatusCodes } from "http-status-codes";

export const errorsMiddleware = (
  err: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";
  res.status(status).json({ error: message });
  next();
};
