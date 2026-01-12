import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.serivce';
import { DeletedObject } from '../dtos/deleted-object.dto';

interface IVariantOptionValue {
  variantId: string;
  optionValueId: string;
}

@Injectable()
export class VariantOptionValueService {
  constructor(private prisma: PrismaService) {}

  private async hasRecord(payload: IVariantOptionValue) {
    const record = await this.prisma.variantOptionValue.findFirst({
      where: {
        ...payload,
      },
    });

    return record !== null;
  }

  async create(payload: IVariantOptionValue) {
    if (await this.hasRecord(payload)) {
      return payload;
    }

    return await this.prisma.variantOptionValue.create({
      data: payload,
    });
  }

  async delete(payload: IVariantOptionValue) {
    if (await this.hasRecord(payload)) {
      await this.prisma.variantOptionValue.delete({
        where: { variantId_optionValueId: { ...payload } },
      });
    }

    return true;
  }
}
