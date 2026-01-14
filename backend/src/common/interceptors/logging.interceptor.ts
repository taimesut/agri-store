import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap, catchError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl } = req;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse<Response>();
        const ms = Date.now() - start;

        this.logger.log(`${method} ${originalUrl} ${res.statusCode} - ${ms}ms`);
      }),
      catchError((error) => {
        const ms = Date.now() - start;

        this.logger.error(`${method} ${originalUrl} ERROR - ${ms}ms`);
        throw error;
      }),
    );
  }
}
