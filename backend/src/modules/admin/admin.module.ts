import { Module } from '@nestjs/common';
import { AdminUsersController } from './controllers/users.controller';
import { CommonModule } from 'src/modules/commons/common.module';
import { AdminAuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { AdminProductController } from './controllers/product.controller';

@Module({
  imports: [CommonModule, JwtModule, MulterModule],
  controllers: [
    AdminUsersController,
    AdminAuthController,
    AdminProductController,
  ],
})
export class AdminModule {}
