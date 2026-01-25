import { Module } from '@nestjs/common';
import { ProductModule } from '../../product.module';
import { TagModule } from 'src/modules/tag/tag.module';
import { ProductTagController } from './controller/_tag.controller';
import { ProductTagRepository } from './repository/_tag.repository';
import { ProductTagService } from './service/_tag.service';

@Module({
  imports: [ProductModule, TagModule],
  controllers: [ProductTagController],
  providers: [ProductTagRepository, ProductTagService],
})
export class ProductTagModule {}
