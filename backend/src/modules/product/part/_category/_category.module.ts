import { Module } from '@nestjs/common';
import { ProductModule } from '../../product.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductCategoryService } from './service/_category.service';
import { ProductCategoryRepository } from './repository/_category.repository';
import { ProductCategoryController } from './controller/_category.controller';

@Module({
  imports: [ProductModule, CategoryModule],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ProductCategoryRepository],
})
export class ProductCategoryModule {}
