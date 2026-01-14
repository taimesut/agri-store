import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ProductStatus } from 'prisma/generated/enums';
import { Trim } from 'src/common/decorators/trim.decorator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @MinLength(1)
  title: string;
  @IsString()
  @IsNotEmpty()
  @Trim()
  @MinLength(1)
  handle: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @MinLength(1)
  description?: string;
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
