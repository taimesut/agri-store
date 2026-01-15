import { Module } from '@nestjs/common';
import { ProductVariantRepository } from './repository/_variant.repository';
import { ProductVariantService } from './service/_variant.service';
import { ProductVariantController } from './controller/_variant.controller';
import { ProductModule } from '../product.module';

@Module({
  imports: [ProductModule],
  providers: [ProductVariantRepository, ProductVariantService],
  controllers: [ProductVariantController],
})
export class ProductVariantModule {}
