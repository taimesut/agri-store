import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './configs/jwt.config';
import appConfig from './configs/app.config';
import prismaConfig from './configs/prisma.config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppJwtModule } from './shared/jwt/jwt.module';
import { TagModule } from './modules/tag/tag.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, appConfig, prismaConfig],
    }),
    AppJwtModule,
    PrismaModule,
    UserModule,
    AuthModule,
    TagModule,
    CategoryModule,
  ],
})
export class AppModule {}
