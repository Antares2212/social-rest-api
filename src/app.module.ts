import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/social')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
