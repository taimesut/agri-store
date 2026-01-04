import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom-http.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

export class ServerErrorException extends CustomHttpException {
  constructor() {
    super(
      RES_MESSAGE.INTERNAL_SERVER_ERROR,
      RES_CODE.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
