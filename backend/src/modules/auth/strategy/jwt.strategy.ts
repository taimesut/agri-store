import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const rawToken: unknown = req.cookies?.access_token;
          return typeof rawToken === 'string' ? rawToken : null;
        },
      ]),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
    });
  }

  validate(payload: IJwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      fullName: payload.fullName,
    };
  }
}
