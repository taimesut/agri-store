// src/config/app.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'shop-api',
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,

  url: {
    api: process.env.API_URL || 'http://localhost:3000',
    web: process.env.WEB_URL || 'http://localhost:3001',
  },

  pagination: {
    limit: 20,
    maxLimit: 100,
  },

  upload: {
    dir: 'uploads',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
}));
