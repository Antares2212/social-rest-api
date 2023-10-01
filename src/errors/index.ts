import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorMsg } from "./errors-list.error";

export class CustomHttpException extends HttpException {
  constructor(message: string, status: HttpStatus) { super(message, status) }
}

export class UserNotFoundExeption extends CustomHttpException {
  constructor() { super(ErrorMsg.UserNotFound, HttpStatus.NOT_FOUND) }
}
