import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { PrismaService } from './services/prisma.serivce';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  providers: [UsersService, PrismaService, AuthService],
  exports: [UsersService, PrismaService, AuthService],
})
export class CommonModule {}
