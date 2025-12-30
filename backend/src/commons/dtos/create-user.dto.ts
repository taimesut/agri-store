import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUser {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
