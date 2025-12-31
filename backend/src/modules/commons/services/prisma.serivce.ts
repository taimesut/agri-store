import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      adapter: PrismaService.createAdapter(),
      log: ['warn', 'error'],
    });
  }

  private static createAdapter(): PrismaMariaDb {
    const {
      DATABASE_HOST,
      DATABASE_PORT,
      DATABASE_NAME,
      DATABASE_USER,
      DATABASE_PASSWORD,
    } = process.env;

    if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_NAME || !DATABASE_USER) {
      throw new Error('Database environment variables are missing');
    }

    return new PrismaMariaDb({
      host: DATABASE_HOST,
      port: Number(DATABASE_PORT),
      database: DATABASE_NAME,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      connectionLimit: 5,
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Database connection verified');
    } catch (error) {
      this.logger.error(
        'Database connection failed. Application will exit.',
        error instanceof Error ? error.stack : undefined,
      );
      process.exit(1);
    }
  }
}
