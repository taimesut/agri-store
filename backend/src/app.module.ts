import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppJwtModule } from './shared/jwt/jwt.module';
import { TagModule } from './modules/tag/tag.module';
import { CategoryModule } from './modules/category/category.module';
import { UploadModule } from './shared/upload/upload.module';
import { ProductModule } from './modules/product/product.module';
import { ProductVariantModule } from './modules/product/part/_variant/_variant.module';
import { ProductImageModule } from './modules/product/part/_image/_image.module';
import { ProductCategoryModule } from './modules/product/part/_category/_category.module';
import { ProductTagModule } from './modules/product/part/_tag/_tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    AppJwtModule,
    PrismaModule,
    UserModule,
    AuthModule,
    TagModule,
    CategoryModule,
    UploadModule,
    ProductModule,
    ProductVariantModule,
    ProductImageModule,
    ProductCategoryModule,
    ProductTagModule,
  ],
})
export class AppModule {}
