import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://voidpresence.com',
      'https://api.voidpresence.com',
      'https://www.voidpresence.com',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.setGlobalPrefix('webhook');

  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}

void bootstrap();
