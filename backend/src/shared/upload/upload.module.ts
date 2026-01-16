import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadController } from './controller/upload.controller';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadDir = 'uploads';
        const maxSize = configService.get<number>('app.upload.maxSize');

        return {
          limits: {
            fieldSize: maxSize,
          },
          storage: diskStorage({
            destination: path.resolve(uploadDir),
            filename: (_req, file, cb) => {
              const ext = path.extname(file.originalname);
              const uniqueName = `${Date.now()}-${Math.round(
                Math.random() * 1e9,
              )}${ext}`;

              cb(null, uniqueName);
            },
          }),
        };
      },
    }),
  ],
  controllers: [UploadController],
  exports: [MulterModule],
})
export class UploadModule {}
