import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use = (req: Request, res: Response, next: (error?: any) => void) => {
    const { ip, method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;

      this.logger.log(
        `${ip} ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
      );
    });

    next();
  };
}
