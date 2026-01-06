import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';
import { RES_CODE } from 'src/utils/contants';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorExceptionFilter.name);
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // lỗi custom
    if (exception instanceof CustomHttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    }
    // lỗi sai url
    else if (exception instanceof NotFoundException) {
      const request = ctx.getRequest<Request>();
      response.status(exception.getStatus()).json({
        code: RES_CODE.NOT_FOUND,
        message: request.url,
      });
    }
    // server error
    else {
      response.status(500).json({
        code: RES_CODE.INTERNAL_SERVER_ERROR,
        message: exception.message,
      });
    }
  }
}
