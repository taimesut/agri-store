import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE } from 'src/utils/contants';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof CustomHttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else if (exception instanceof NotFoundException) {
      const request = ctx.getRequest<Request>();
      response.status(exception.getStatus()).json({
        code: RES_CODE.NOT_FOUND,
        message: request.url,
      });
    } else {
      response.status(500).json({
        code: RES_CODE.INTERNAL_SERVER_ERROR,
        message: exception.message,
      });
    }
  }
}
