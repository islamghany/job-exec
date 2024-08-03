import { StatusCodes } from "http-status-codes";

export class HTTPException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class NotFoundException extends HTTPException {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}
