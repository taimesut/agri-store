import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import cookieParser from 'cookie-parser';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { AppValidationPipe } from './pipes/app-validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.use(new LoggerMiddleware().use);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  app.useGlobalPipes(new AppValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
