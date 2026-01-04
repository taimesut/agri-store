import { Module } from '@nestjs/common';
import { AdminUsersController } from './controllers/users.controller';
import { CommonModule } from 'src/modules/commons/common.module';
import { AdminAuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminCategoryController } from './controllers/category.controller';

@Module({
  imports: [CommonModule, JwtModule],
  controllers: [
    AdminUsersController,
    AdminAuthController,
    AdminCategoryController,
  ],
})
export class AdminModule {}
