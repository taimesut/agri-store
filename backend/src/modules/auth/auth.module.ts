import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthRepository } from './repository/auth.repository';
import { AuthController } from './controller/auth.controller';
import { AppJwtModule } from 'src/shared/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [AppJwtModule, PassportModule],
  providers: [AuthService, AuthRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
