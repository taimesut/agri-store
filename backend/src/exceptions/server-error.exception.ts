import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom-http.exception';
import { RES_CODE } from 'src/utils/contants';

export class ServerErrorException extends CustomHttpException {
  constructor() {
    super(
      'Unknown error',
      RES_CODE.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
