import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class CreateUserDTO {
  @IsEmail()
  @Trim()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Trim()
  fullName: string;
  @IsOptional()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Trim()
  phone?: string;
}
