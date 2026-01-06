import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom-http.exception';

export class CustomBadRequestException extends CustomHttpException {
  constructor(message: string, code: string) {
    super(message, code, HttpStatus.BAD_REQUEST);
  }
}
