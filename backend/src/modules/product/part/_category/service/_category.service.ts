import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../../../repository/product.repository';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';
import { ProductCategoryRepository } from '../repository/_category.repository';
import { UpdateProductCategoryDTO } from '../dto/update-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly productCategoryRepo: ProductCategoryRepository,
  ) {}

  async throwProductNotFound(pId: string) {
    const hasProduct = await this.productRepo.hasId(pId);
    if (!hasProduct) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT',
        message: `Product not found with id: ${pId}`,
      });
    }
  }

  async throwCategoryNotFound(cId: string) {
    const hasCategory = await this.categoryRepo.hasId(cId);
    if (!hasCategory) {
      throw new NotFoundException({
        code: 'NOT_FOUND_CATEGORY',
        message: `Category not found with id: ${cId}`,
      });
    }
  }

  async throwProductCategoryExists(pId: string, cId: string) {
    const hasCategory = await this.productCategoryRepo.hasId(pId, cId);
    if (hasCategory) {
      throw new ConflictException({
        code: 'PRODUCT_CATEGORY_IS_EXISTINGS',
        message: `Product_Category already exists`,
      });
    }
  }

  async throwProductCategoryNotFound(pId: string, cId: string) {
    const hasCategory = await this.productCategoryRepo.hasId(pId, cId);
    if (!hasCategory) {
      throw new ConflictException({
        code: 'NOT_FOUND_PRODUCT_CATEGORY',
        message: `Product_Category not found with id: ${pId} - ${cId}`,
      });
    }
  }

  async findOne(pId: string, cId: string) {
    await this.throwProductNotFound(pId);
    const category = await this.productCategoryRepo.findOne(pId, cId);
    return category?.category;
  }

  async findAll(pId: string) {
    await this.throwProductNotFound(pId);
    const categories = await this.productCategoryRepo.findAll(pId);
    return categories.map((c) => c.category);
  }
  async update(pId: string, payload: UpdateProductCategoryDTO) {
    await this.throwProductNotFound(pId);

    const { add, remove } = payload;

    if (add) {
      for (const cId of add) {
        await this.throwCategoryNotFound(cId);
        await this.throwProductCategoryExists(pId, cId);

        await this.productCategoryRepo.add(pId, cId);
      }
    }
    if (remove) {
      for (const cId of remove) {
        await this.throwCategoryNotFound(cId);
        await this.throwProductCategoryNotFound(pId, cId);
        await this.productCategoryRepo.remove(pId, cId);
      }
    }

    return await this.findAll(pId);
  }
}
