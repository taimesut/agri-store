import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(message: string, code: string, status: HttpStatus) {
    super(
      {
        message,
        code,
      },
      status,
    );
  }
}
