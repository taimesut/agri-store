import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagRepository } from '../repository/tag.repository';
import { CreateTagDTO } from '../dto/create-tag.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { UpdateTagDTO } from '../dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}
  async create(payload: CreateTagDTO) {
    if (await this.tagRepo.hasName(payload.name)) {
      throw new ConflictException({
        code: 'NAME_IS_EXISTING',
        message: 'Name already exists',
      });
    }

    return await this.tagRepo.create(payload);
  }

  async findOne(id: string) {
    return await this.tagRepo.findById(id);
  }

  async findAll(query: PaginationQueryDto) {
    return await this.tagRepo.findAll(query);
  }

  async update(id: string, payload: UpdateTagDTO) {
    if (!(await this.tagRepo.findById(id))) {
      throw new NotFoundException({
        code: 'NOT_FOUND_TAG',
        message: `Tag not found with id:${id}`,
      });
    }

    return await this.tagRepo.updateById(id, payload);
  }

  async delete(id: string) {
    if (!(await this.tagRepo.findById(id))) {
      throw new NotFoundException({
        code: 'NOT_FOUND_TAG',
        message: `Tag not found with id:${id}`,
      });
    }

    await this.tagRepo.deleteById(id);
    return { message: 'Deleted' };
  }
}
