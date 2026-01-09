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
        // const messages = errors.flatMap((error) =>
        //   Object.values(error.constraints ?? {}),
        // );

        const messages = this.flattenErrors(errors);

        throw new CustomBadRequestException(
          messages[0],
          RES_CODE.VALIDATION_FAILED,
        );
      },
    });
  }

  private flattenErrors(errors: ValidationError[], parent = ''): string[] {
    const result: string[] = [];

    for (const error of errors) {
      const field = parent ? `${parent}.${error.property}` : error.property;

      if (error.constraints) {
        result.push(
          ...Object.values(error.constraints).map((msg) => `${field}: ${msg}`),
        );
      }

      if (error.children?.length) {
        result.push(...this.flattenErrors(error.children, field));
      }
    }

    return result;
  }
}
