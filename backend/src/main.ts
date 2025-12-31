import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppValidationPipe } from './pipes/validation.pipe';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());
  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(new AppValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
