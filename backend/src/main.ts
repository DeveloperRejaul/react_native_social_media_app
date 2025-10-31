import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { join } from 'path';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// check env variables exist before stating server
const requiredEnv = [
  'PORT',
  'PG_HOST',
  'PG_PORT',
  'PG_USER',
  'PG_PASS',
  'PG_NAME',
  'ORIGIN',
  'COOKIE_KEY',
  'JWT_SECRET',
];
const env = new Set(Object.keys(process.env));

if (!requiredEnv.every((key) => env.has(key))) {
  console.error('Missing required environment variables');
  process.exit(1);
}
console.error('Environment variables successfully loaded');

async function bootstrap() {
  try {
    // create upload directory if not created
    const path = join(process.cwd(), 'upload');
    if (!existsSync(path)) await mkdir(path);

    // create server
    const PORT = parseInt(process.env.PORT || "8000"); 
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: [],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,  
    });
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
    app.use(cookieParser(process.env.COOKIE_KEY));

    const config = new DocumentBuilder()
      .setTitle('Social media app ')
      .setDescription('The social media app API description')
      .setVersion('1.0')
      .addTag('social media')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    await app.listen(PORT);
    console.log('App listening on port ' + PORT);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
