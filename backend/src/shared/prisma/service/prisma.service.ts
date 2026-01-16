import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'prisma/generated/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly config: ConfigService) {
    super({
      adapter: PrismaService.createAdapter(config),
      log: config.get('app.prisma.log'),
    });
  }

  private static createAdapter(config: ConfigService): PrismaMariaDb {
    const host = config.get<string>('app.prisma.host');
    const port = config.get<number>('app.prisma.port');
    const database = config.get<string>('app.prisma.database');
    const user = config.get<string>('app.prisma.user');
    const password = config.get<string>('app.prisma.password');
    const connectionLimit = config.get<number>('app.prisma.connectionLimit');

    if (!host || !database || !user) {
      throw new Error('Database configuration is missing');
    }

    return new PrismaMariaDb({
      host,
      port,
      database,
      user,
      password,
      connectionLimit,
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Database connection verified');
    } catch {
      this.logger.error('Database connection failed. Application will exit.');
      process.exit(1);
    }
  }
}
