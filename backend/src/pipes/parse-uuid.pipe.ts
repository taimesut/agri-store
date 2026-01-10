import { PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

export class CustomParseUUID implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isUUID(value, '4')) {
      throw new CustomBadRequestException(
        RES_MESSAGE.PIPE__PARSE_INT_ERROR,
        RES_CODE.__VALIDATION_FAILED,
      );
    }

    return value;
  }
}
