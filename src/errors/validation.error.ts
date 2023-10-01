import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ErrorMsg } from "./errors-list.error";

export class ValidationException extends HttpException {
  constructor(public readonly errors: ValidationError[]) {
    super(ErrorMsg.ValidationError, HttpStatus.BAD_REQUEST);
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }
}