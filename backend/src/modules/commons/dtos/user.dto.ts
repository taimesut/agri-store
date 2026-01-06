import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class IUserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export class IUpdateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}

export class ICreateUserDTO {
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
