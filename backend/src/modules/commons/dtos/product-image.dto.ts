import { IsNumber, IsString } from 'class-validator';

export class ProductImageDTO {
  @IsString()
  url: string;

  @IsNumber()
  position: number;
}
