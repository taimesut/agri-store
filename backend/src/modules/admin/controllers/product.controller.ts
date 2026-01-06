import {
  Controller,
  Post,
  Body,
  Logger,
  Delete,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import { UserService } from '../../commons/services/user.service';
import { BaseResponse } from 'src/responses/base.response';
import { CustomParseIntPipe } from 'src/pipes/parse-int.pipe';
import {
  ICreateUserDTO,
  IUpdateUserDTO,
} from 'src/modules/commons/dtos/user.dto';
import { ProductService } from 'src/modules/commons/services/product.service';
import { ICreateProductDTO } from 'src/modules/commons/dtos/product.dto';

@Controller('products')
export class AdminProductsController {
  private readonly logger = new Logger(AdminProductsController.name);
  constructor(private readonly productService: ProductService) {}

  //   @Get('/:id')
  //   async findOne(@Param('id', CustomParseIntPipe) id: number) {
  //     return new BaseResponse('user', await this.productService.findOne(id));
  //   }

  //   @Get()
  //   async findAll() {
  //     return new BaseResponse('users', await this.productService.findAll());
  //   }

  @Post()
  async create(@Body() payload: ICreateProductDTO) {
    return new BaseResponse(
      'product',
      await this.productService.create(payload),
    );
  }

  //   @Put('/:id')
  //   async update(
  //     @Param('id', CustomParseIntPipe) id: number,
  //     @Body() payload: IUpdateUserDTO,
  //   ) {
  //     return new BaseResponse(
  //       'user',
  //       await this.productService.update(id, payload),
  //     );
  //   }

  //   @Delete('/:id')
  //   async delete(@Param('id', CustomParseIntPipe) id: number) {
  //     return new BaseResponse('user', await this.productService.delete(id));
  //   }
}
