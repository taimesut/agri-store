import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateTagDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
