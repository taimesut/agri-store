import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadController {
  @Post('/image')
  @UseInterceptors(FileInterceptor('image'))
  image(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      //   originalname: file.originalname,
      //   path: file.path,
      //   size: file.size,
    };
  }

  @Post('/images')
  @UseInterceptors(FilesInterceptor('images', 5))
  images(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map((file) => ({
      filename: file.filename,
      //   path: file.path,
      //   size: file.size,
    }));
  }
}
