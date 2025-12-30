import { Module } from '@nestjs/common';
import { AdminUsersController } from './controllers/users.controller';
import { CommonModule } from 'src/commons/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AdminUsersController],
})
export class AdminModule {}
