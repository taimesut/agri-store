import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { ICRUD } from 'src/utils/interfaces';
import {
  ICreateProductDTO,
  IProductDTO,
  IUpdateProductDTO,
} from '../dtos/product.dto';
import { toSlug } from 'src/utils/string';
import { CustomHttpException } from 'src/exceptions/custom-http.exception';

@Injectable()
export class ProductService implements ICRUD<
  IProductDTO,
  ICreateProductDTO,
  IUpdateProductDTO
> {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService) {}

  private async hasId(id: number): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    return product !== null;
  }

  private async hasCategoryId(id: number): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });

    return category !== null;
  }

  private async hasSku(sku: string): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
      select: { id: true },
    });

    return product !== null;
  }

  private async hasHandle(handle: string): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { handle },
      select: { id: true },
    });
    this.logger.log(product);
    return product !== null;
  }

  private resolveHandle(name: string, handle?: string): string {
    if (handle !== undefined && handle !== '' && handle !== null) return handle;
    return toSlug(name);
  }

  async create(payload: ICreateProductDTO): Promise<IProductDTO> {
    const resolvedHandle = this.resolveHandle(payload.name, payload.handle);
    this.logger.log(resolvedHandle);

    // check handle unique
    if (await this.hasHandle(resolvedHandle)) {
      throw new CustomHttpException('', '', HttpStatus.BAD_REQUEST);
    }
    // check sku unique
    if (payload.sku && (await this.hasSku(payload.sku))) {
      throw new CustomHttpException('', '', HttpStatus.BAD_REQUEST);
    }

    // check categoryId exist
    if (payload.categoryId && !(await this.hasCategoryId(payload.categoryId))) {
      throw new CustomHttpException('', '', HttpStatus.BAD_REQUEST);
    }
    const { handle, ...rest } = payload;

    return await this.prisma.product.create({
      data: {
        ...rest,
        handle: resolvedHandle,
      },
    });
  }
  findAll(): Promise<IProductDTO[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<IProductDTO | null> {
    throw new Error('Method not implemented.');
  }
  update(id: number, dto: IUpdateProductDTO): Promise<IProductDTO> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<IProductDTO> {
    throw new Error('Method not implemented.');
  }
}
