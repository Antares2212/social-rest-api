export interface HttpExceptionResponse {
  statusCode: number
  error: string
}

export interface CustomExceptionResponse extends HttpExceptionResponse {
  path: string
  method: string
  timeStamp: Date
}