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

  async throwHandleExists(handle: string) {
    const hasHandle = await this.categoryRepo.hasHandle(handle);
    if (hasHandle) {
      throw new ConflictException({
        code: 'HANDLE_IS_EXISTING',
        message: 'Handle already exists',
      });
    }
  }

  async throwCategoryNotFound(id: string) {
    const hasId = await this.categoryRepo.hasId(id);
    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_CATEGORY',
        message: `Category not found with id: ${id}`,
      });
    }
  }

  async create(payload: CreateCategoryDTO) {
    const { handle, parentId } = payload;
    await this.throwHandleExists(handle);
    if (parentId) {
      await this.throwCategoryNotFound(parentId);
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
    await this.throwCategoryNotFound(id);

    await this.categoryRepo.deleteById(id);

    return { message: 'Deleted' };
  }

  async update(id: string, payload: UpdateCategoryDTO) {
    const { handle, parentId } = payload;
    if (handle) {
      await this.throwHandleExists(handle);
    }

    if (parentId) {
      await this.throwCategoryNotFound(parentId);
    }
    return await this.categoryRepo.update(id, payload);
  }
}
