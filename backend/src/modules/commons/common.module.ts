import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma.serivce';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
          },
        }),
      }),
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    AuthService,
    ProductService,
    CategoryService,
    TagService,
  ],
  exports: [
    UserService,
    PrismaService,
    AuthService,
    ProductService,
    MulterModule,
    CategoryService,
    TagService,
  ],
})
export class CommonModule {}
