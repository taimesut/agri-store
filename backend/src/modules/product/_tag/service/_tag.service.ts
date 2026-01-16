import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductTagRepository } from '../repository/_tag.repository';
import { ProductRepository } from '../../repository/product.repository';
import { TagRepository } from 'src/modules/tag/repository/tag.repository';
import { UpdateProductTagDTO } from '../dto/update-tag.dto';

@Injectable()
export class ProductTagService {
  constructor(
    private readonly productTagRepo: ProductTagRepository,
    private readonly productRepo: ProductRepository,
    private readonly tagRepo: TagRepository,
  ) {}

  async throwProductNotFound(pId: string) {
    const has = await this.productRepo.hasId(pId);
    if (!has) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT',
        message: `Product not found with id: ${pId}`,
      });
    }
  }
  async throwTagNotFound(tId: string) {
    const has = await this.tagRepo.hasId(tId);
    if (!has) {
      throw new NotFoundException({
        code: 'NOT_FOUND_TAG',
        message: `Tag not found with id: ${tId}`,
      });
    }
  }
  async throwProductTagExists(pId: string, tId: string) {
    const has = await this.productTagRepo.hasId(pId, tId);
    if (has) {
      throw new ConflictException({
        code: 'PRODUCT_TAG_IS_EXISTING',
        message: `Product_Tag already exists`,
      });
    }
  }

  async throwProductTagNotFound(pId: string, tId: string) {
    const has = await this.productTagRepo.hasId(pId, tId);
    if (!has) {
      throw new NotFoundException({
        code: 'NOT_FOUND_PRODUCT_TAG',
        message: `Product_Tag not found with id: ${pId} - ${tId}`,
      });
    }
  }

  async findOne(pId: string, tId: string) {
    await this.throwProductNotFound(pId);
    await this.throwTagNotFound(tId);
    return (await this.productTagRepo.findOne(pId, tId))?.tag;
  }
  async findAll(pId: string) {
    await this.throwProductNotFound(pId);
    return (await this.productTagRepo.findAll(pId)).map((pt) => pt.tag);
  }
  async update(pId: string, payload: UpdateProductTagDTO) {
    await this.throwProductNotFound(pId);

    const { add, remove } = payload;

    if (add) {
      for (const tId of add) {
        await this.throwTagNotFound(tId);
        await this.throwProductTagExists(pId, tId);
        await this.productTagRepo.add(pId, tId);
      }
    }

    if (remove) {
      for (const tId of remove) {
        await this.throwTagNotFound(tId);
        await this.throwProductTagNotFound(pId, tId);
        await this.productTagRepo.add(pId, tId);
      }
    }

    return await this.findAll(pId);
  }
}
