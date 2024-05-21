import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // Ajoutez cette ligne pour importer dotenv
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

require('dotenv').config({ path: '/.env' });
async function bootstrap() {
  // Ajoutez cette ligne pour charger les variables d'environnement
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
      { cors: true },
    );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(8080);
}
bootstrap();
