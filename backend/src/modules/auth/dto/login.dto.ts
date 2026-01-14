import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class LoginDTO {
  @IsEmail()
  @Trim()
  @IsNotEmpty()
  email: string;
  @IsString()
  @Trim()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
