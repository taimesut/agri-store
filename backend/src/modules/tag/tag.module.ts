import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { TagRepository } from './repository/tag.repository';
import { TagController } from './controller/tag.controller';

@Module({
  providers: [TagService, TagRepository],
  controllers: [TagController],
})
export class TagModule {}
