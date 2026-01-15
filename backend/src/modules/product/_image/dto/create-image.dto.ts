import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProudctImageDTO {
  @IsString()
  @IsNotEmpty()
  url: string;
  @IsNumber()
  position: number;
}
