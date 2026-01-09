import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';
import { RES_CODE } from 'src/utils/contants';

export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints ?? {}),
        );

        throw new CustomBadRequestException(
          messages[0],
          RES_CODE.VALIDATION_FAILED,
        );
      },
    });
  }
}
