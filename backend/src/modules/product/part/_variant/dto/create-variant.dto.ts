import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { VariantAttributesDTO } from './variant-attributes.dto';
import { Type } from 'class-transformer';
import { Trim } from 'src/common/decorators/trim.decorator';

export class CreateProductVariantDTO {
  @IsString()
  @IsNotEmpty()
  @Trim()
  sku: string;
  @IsNumber()
  @Min(0)
  price: number;
  @IsNumber()
  @Min(0)
  stock: number;
  @IsObject()
  @ValidateNested()
  @Type(() => VariantAttributesDTO)
  attributes: VariantAttributesDTO;
}
