import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(payload: CreateCategoryDTO) {
    const { handle, parentId } = payload;
    const hasHandle = await this.categoryRepo.hasHandle(handle);
    if (hasHandle) {
      throw new ConflictException({
        code: 'HANDLE_IS_EXISTING',
        message: 'Handle already exists',
      });
    }
    if (parentId) {
      const hasParentId = await this.categoryRepo.hasId(parentId);
      if (!hasParentId) {
        throw new NotFoundException({
          code: 'NOT_FOUND_CATEGORY',
          message: `Category not found with id: ${parentId}`,
        });
      }
    }
    return await this.categoryRepo.create(payload);
  }

  async findOne(id: string) {
    return await this.categoryRepo.findById(id);
  }

  async findAll(query: PaginationQueryDTO) {
    return await this.categoryRepo.findAll(query);
  }
  async delete(id: string) {
    if (!(await this.categoryRepo.hasId(id))) {
      throw new NotFoundException({
        code: 'NOT_FOUND_CATEGORY',
        message: `Category not found with id: ${id}`,
      });
    }

    await this.categoryRepo.deleteById(id);

    return { message: 'Deleted' };
  }

  async update(id: string, payload: UpdateCategoryDTO) {
    const { handle, parentId } = payload;
    if (handle) {
      const hasHandle = await this.categoryRepo.hasHandle(handle);
      if (hasHandle) {
        throw new ConflictException({
          code: 'HANDLE_IS_EXISTING',
          message: 'Handle already exists',
        });
      }
    }

    if (parentId) {
      const hasParentId = await this.categoryRepo.hasId(parentId);
      if (!hasParentId) {
        throw new NotFoundException({
          code: 'NOT_FOUND_CATEGORY',
          message: `Category not found with id: ${parentId}`,
        });
      }
    }
    return await this.categoryRepo.update(id, payload);
  }
}
