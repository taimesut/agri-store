import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTagDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
