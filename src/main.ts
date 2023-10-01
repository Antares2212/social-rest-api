import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExeptionFilter } from './core/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExeptionFilter())
  await app.listen(3000);
}
bootstrap();
