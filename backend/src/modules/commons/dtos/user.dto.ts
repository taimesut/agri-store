import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}

export class CreateUserDTO {
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
