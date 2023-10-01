import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpException, BadRequestException } from "@nestjs/common"
import { Response, Request } from 'express'
import { CustomExceptionResponse, HttpExceptionResponse } from "../interfaces/http-exception-response.interface"
import { RequestWithUser } from "src/interfaces/request-with-user.interface"
import { ValidationError } from 'class-validator';
import { ValidationException } from "src/errors/validation.error";

import * as fs from 'fs'
import { ErrorMsg } from '../errors/errors-list.error';

@Catch()
export class AllExeptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<RequestWithUser>()    
    let status: HttpStatus
    let errorMessage: string
    let errorRequest: Array<[]>

    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      errorMessage = 'Ошибка валидации';
      const validationErrors = exception.getResponse(); 

      console.log(validationErrors['message']);
      

      errorRequest = validationErrors['message']
    } else if(exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse()

      errorMessage = (errorResponse as HttpExceptionResponse).error || exception.message
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      errorMessage = ErrorMsg.FatalErrorServer
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, errorRequest, request)
    const errorLog = this.getErrorLog(errorResponse, request, exception)

    this.writeErrorLogToFile(errorLog)

    response.status(status).json(errorResponse)
  }

  private getErrorResponse = (status: HttpStatus, errorMessage: string, validationErrors: Array<[]>, request: Request): CustomExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    message: validationErrors,
    path: request.url,
    method: request.method,
    timeStamp: new Date()
  })

  private getErrorLog = (errorResponse: CustomExceptionResponse, request: RequestWithUser, exception: unknown): string => {
    const { statusCode, error } = errorResponse
    const { method, url } = request
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
    ${JSON.stringify(errorResponse)}\n\n
    User: ${JSON.stringify(request.user ?? 'Not signed in')}\n\n
    ${exception instanceof HttpException ? exception.stack : error}\n\n`
    console.log(errorLog)

    return errorLog
  }

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile('error.log', errorLog, 'utf-8', (err) => {
      if (err) throw err
    })
  }
}