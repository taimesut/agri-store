import { Module } from '@nestjs/common';
import { ProductImageController } from './controller/_image.controller';
import { ProductModule } from '../../product.module';
import { ProductImageRepository } from './repository/_image.repository';
import { ProductImageService } from './service/_image.service';

@Module({
  controllers: [ProductImageController],
  imports: [ProductModule],
  providers: [ProductImageRepository, ProductImageService],
})
export class ProductImageModule {}
