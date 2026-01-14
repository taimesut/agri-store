// src/config/prisma.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('prisma', () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT || 3306),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,

  connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT || 5),
  log: process.env.NODE_ENV === 'production' ? ['warn'] : ['warn', 'error'],
}));
