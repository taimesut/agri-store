import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class VariantOptionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class ProductVariantDTO {
  @IsString()
  sku: string;

  @IsString()
  title: string;

  @IsNumber()
  price: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VariantOptionDTO)
  options: VariantOptionDTO[];
}
