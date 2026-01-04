import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma.serivce';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryService } from './services/category.service';

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
  ],
  providers: [UserService, PrismaService, AuthService, CategoryService],
  exports: [UserService, PrismaService, AuthService, CategoryService],
})
export class CommonModule {}
