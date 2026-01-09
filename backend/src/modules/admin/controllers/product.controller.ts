import {
  Controller,
  Post,
  Body,
  Logger,
  Delete,
  Param,
  Put,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { BaseResponse } from 'src/responses/base.response';
import { CustomParseIntPipe } from 'src/pipes/parse-int.pipe';

import { ProductService } from 'src/modules/commons/services/product.service';
import {
  ICreateProductDTO,
  IUpdateProductDTO,
} from 'src/modules/commons/dtos/product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
@UseGuards(AuthGuard)
export class AdminProductsController {
  private readonly logger = new Logger(AdminProductsController.name);
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('product', await this.productService.findOne(id));
  }

  @Get()
  async findAll() {
    return new BaseResponse('products', await this.productService.findAll());
  }

  @Post()
  async create(@Body() payload: ICreateProductDTO) {
    return new BaseResponse(
      'product',
      await this.productService.create(payload),
    );
  }

  @Put('/:id')
  async update(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() payload: IUpdateProductDTO,
  ) {
    return new BaseResponse(
      'product',
      await this.productService.update(id, payload),
    );
  }

  @Delete('/:id')
  async delete(@Param('id', CustomParseIntPipe) id: number) {
    return new BaseResponse('product', await this.productService.delete(id));
  }

  @Post('/uploads/:id')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Param('id', CustomParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return file;
  }
  @Post('/uploadss/:id')
  @UseInterceptors(FilesInterceptor('files'))
  uploads(
    @Param('id', CustomParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return files;
  }
}
