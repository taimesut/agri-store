import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { corsConfig } from './configs/cors.config';
import { validationPipe } from './configs/validation.pipe.config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('app.port') || 3000;

  app.useStaticAssets(join(__dirname, '..', '../uploads'), {
    index: false,
    prefix: '/uploads/',
  });

  app.use(cookieParser());
  app.enableCors(corsConfig(configService));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(validationPipe);
  await app.listen(PORT);
}
void bootstrap();
