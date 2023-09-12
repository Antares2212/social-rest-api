import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpException } from "@nestjs/common"
import { Response, Request } from 'express'
import { CustomExceptionResponse, HttpExceptionResponse } from "./models/http-exception-response.interface"
import { RequestWithUser } from "src/auth/schema/user.interface"

import * as fs from 'fs'

@Catch()
export class AllExeptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<RequestWithUser>()

    let status: HttpStatus
    let errorMessage: string

    if(exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse()

      errorMessage = (errorResponse as HttpExceptionResponse).error || exception.message

    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      errorMessage = 'Критическая ошибка сервера'
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request)
    const errorLog = this.getErrorLog(errorResponse, request, exception)

    this.writeErrorLogToFile(errorLog)

    response.status(status).json(errorResponse)
  }

  private getErrorResponse = (status: HttpStatus, errorMessage: string, request: Request): CustomExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
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