import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // console.log('exception', exception);
    // console.log('host', host);

    const context = host.switchToHttp();
    const response = context.getResponse();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    console.log(exceptionResponse);

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, unknown>);
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
