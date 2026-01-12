import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ProductOptionDTO {
  title: string;

  values: string[];
}

export class CreateProductOptionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  values: string[];
}

export class UpdateProductOptionDTO extends PartialType(
  CreateProductOptionDTO,
) {}
