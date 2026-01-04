import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserReqDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}

export class CreateUserReqDTO {
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
