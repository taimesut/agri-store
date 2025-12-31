import { BadRequestException, PipeTransform } from '@nestjs/common';

export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = Number(value);

    if (Number.isNaN(val)) {
      throw new BadRequestException({
        code: 'VALIDATION_FAILED',
        message: 'Validation failed (numeric string is expected)',
      });
    }

    return val;
  }
}
