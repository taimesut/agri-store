import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTagDTO, UpdateTagDTO } from 'src/modules/commons/dtos/tag.dto';
import { TagService } from 'src/modules/commons/services/tag.service';
import { BaseResponse } from 'src/responses/base.response';
import { IControllerCrud } from 'src/utils/interfaces';

@Controller('tags')
export class AdminTagController implements IControllerCrud<
  CreateTagDTO,
  UpdateTagDTO
> {
  private readonly logger = new Logger(AdminTagController.name);
  constructor(private tagService: TagService) {}
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return new BaseResponse('tag', await this.tagService.findOne(id));
  }

  @Get()
  async findAll(): Promise<any> {
    return new BaseResponse('tags', await this.tagService.findAll());
  }

  @Post()
  async create(@Body() payload: CreateTagDTO): Promise<any> {
    return new BaseResponse('tag', await this.tagService.create(payload));
  }

  @Post('/:id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateTagDTO,
  ): Promise<any> {
    return new BaseResponse('tag', await this.tagService.update(id, payload));
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return new BaseResponse('tag', await this.tagService.delete(id));
  }
}
