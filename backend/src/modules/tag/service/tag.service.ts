import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagRepository } from '../repository/tag.repository';
import { CreateTagDTO } from '../dto/create-tag.dto';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { UpdateTagDTO } from '../dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async throwTagNotFound(id: string) {
    const hasId = await this.tagRepo.hasId(id);
    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_TAG',
        message: `Tag not found with id:${id}`,
      });
    }
  }

  async throwNameExists(name: string) {
    const hasName = await this.tagRepo.hasName(name);

    if (hasName) {
      throw new ConflictException({
        code: 'NAME_IS_EXISTING',
        message: 'Name already exists',
      });
    }
  }

  async create(payload: CreateTagDTO) {
    const { name } = payload;
    await this.throwNameExists(name);

    return await this.tagRepo.create(payload);
  }

  async findOne(id: string) {
    return await this.tagRepo.findById(id);
  }

  async findAll(query: PaginationQueryDTO) {
    return await this.tagRepo.findAll(query);
  }

  async update(id: string, payload: UpdateTagDTO) {
    const { name } = payload;
    await this.throwTagNotFound(id);
    if (name) {
      const tagExist = await this.tagRepo.findById(id);
      if (name !== tagExist?.name) {
        await this.throwNameExists(name);
      }
    }

    return await this.tagRepo.updateById(id, payload);
  }

  async delete(id: string) {
    await this.throwTagNotFound(id);
    await this.tagRepo.deleteById(id);
    return { message: 'Deleted' };
  }
}
