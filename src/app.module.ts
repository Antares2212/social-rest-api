import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { AllExeptionFilter } from './core/all-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/social')
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AllExeptionFilter
  }],
})
export class AppModule {}
