// src/config/app.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'shop-api',
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  url: {
    web: process.env.WEB_URL || 'http://localhost:3000',
  },

  pagination: {
    limit: 20,
    maxLimit: 100,
  },

  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
  },

  prisma: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,

    connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT || 5),
    log: process.env.NODE_ENV === 'production' ? ['warn'] : ['warn', 'error'],
  },
}));
