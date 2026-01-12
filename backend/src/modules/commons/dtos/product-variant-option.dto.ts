import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductVariantOptionDTO {
  title: string;
  value: string;
}

export class CreateProductVariantOptionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class UpdateProductVariantOptionDTO extends PartialType(
  CreateProductVariantOptionDTO,
) {}
