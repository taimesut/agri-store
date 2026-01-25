import { IsOptional, IsString } from 'class-validator';

export class VariantAttributesDTO {
  @IsOptional()
  @IsString()
  color?: string;
  @IsOptional()
  @IsString()
  size?: string;
  @IsOptional()
  @IsString()
  material?: string;
}
