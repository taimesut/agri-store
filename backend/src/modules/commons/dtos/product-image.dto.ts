import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductImageDTO {
  url: string;

  position: number;
}

export class CreateProductImageDTO {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @Min(0)
  position: number;
}

export class UpdateProductImageDTO extends PartialType(CreateProductImageDTO) {}
