import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status: number = exception.getStatus() as number;
        const exceptionResponse = exception.getResponse();

        const error = typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as object);

        // @ts-ignore
        response.status(status).json({
            ...error,
            timestamp: new Date().toISOString(),
            statusCode: status,
            path: ctx.getRequest().url,
        });
    }
}
