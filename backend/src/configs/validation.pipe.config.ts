import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const firstError = errors[0];

    const firstConstraint = firstError.constraints
      ? Object.values(firstError.constraints)[0]
      : 'Validation error';

    return new BadRequestException({
      message: firstConstraint,
    });
  },
});
