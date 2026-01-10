import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductImageDTO {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @Min(0)
  position: number;
}

export class CreateProductImageDTO {
  url: string;

  position: number;
}
