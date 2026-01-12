import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class TagDTO {
  value: string;
}

export class CreateTagDTO {
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class UpdateTagDTO extends PartialType(CreateTagDTO) {}
