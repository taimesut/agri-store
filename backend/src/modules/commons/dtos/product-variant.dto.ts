import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductVariantOptionDTO } from './product-variant-option.dto';
import { InventoryDTO } from './inventory.dto';

export class ProductVariantDTO {
  sku: string;

  title: string;

  price: string;

  options: ProductVariantOptionDTO[];

  inventory: InventoryDTO;
}

export class CreateProductVariantDTO {
  @IsString()
  sku: string;

  @IsString()
  title: string;

  @IsNumber()
  price: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductVariantOptionDTO)
  options: ProductVariantOptionDTO[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => InventoryDTO)
  inventory: InventoryDTO;
}