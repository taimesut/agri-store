import { IsEmail, IsString, MinLength } from 'class-validator';

export class ILoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
