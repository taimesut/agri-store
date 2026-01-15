import { PartialType } from '@nestjs/mapped-types';
import { CreateProudctImageDTO } from './create-image.dto';

export class UpdateProductImageDTO extends PartialType(CreateProudctImageDTO) {}
