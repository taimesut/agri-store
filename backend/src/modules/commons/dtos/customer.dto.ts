import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CustomerDTO {
  email: string;
  full_name: string;
  phone: string;
}

export class CreateCustomerDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
