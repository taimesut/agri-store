import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
}
