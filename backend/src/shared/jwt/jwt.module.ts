// src/shared/jwt/jwt.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('app.jwt.secret'),
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AppJwtModule {}
