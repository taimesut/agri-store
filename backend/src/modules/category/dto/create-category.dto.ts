import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class CreateCategoryDTO {
  @IsString()
  @Trim()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
  @IsString()
  @Trim()
  @IsNotEmpty()
  @MinLength(1)
  handle: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  parentId?: string;
}
