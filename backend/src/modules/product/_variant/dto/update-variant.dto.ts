import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantDTO } from './create-variant.dto';

export class UpdateProductVariantDTO extends PartialType(
  CreateProductVariantDTO,
) {}
