import { IsNotEmpty } from 'class-validator';

export class UpdateUser {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
