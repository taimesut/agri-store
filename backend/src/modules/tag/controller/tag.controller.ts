import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { CreateTagDTO } from '../dto/create-tag.dto';
import { UpdateTagDTO } from '../dto/update-tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return { tag: await this.tagService.findOne(id) };
  }
  @Get()
  async findAll(@Query() query: PaginationQueryDTO) {
    const { data, meta } = await this.tagService.findAll(query);
    return { tags: data, meta };
  }
  @Post()
  async create(@Body() payload: CreateTagDTO) {
    return { tag: await this.tagService.create(payload) };
  }
  @Post('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateTagDTO) {
    return { tag: await this.tagService.update(id, payload) };
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }
}
