export interface HttpExceptionResponse {
  statusCode: number
  error: string
}

export interface CustomExceptionResponse extends HttpExceptionResponse {
  message: Array<[]>,
  path: string
  method: string
  timeStamp: Date
}