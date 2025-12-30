import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { PrismaService } from './services/prisma.serivce';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService, PrismaService],
})
export class CommonModule {}
