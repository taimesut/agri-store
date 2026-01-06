import { PipeTransform } from '@nestjs/common';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE, RES_MESSAGE } from 'src/utils/contants';

export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = Number(value);

    if (Number.isNaN(val)) {
      throw new CustomBadRequestException(
        RES_MESSAGE.CUSTOM_PARSE_INT_PIPE_ERROR,
        RES_CODE.VALIDATION_FAILED,
      );
    }

    return val;
  }
}
