import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AutoIdModule } from './modules/auto-id.module';
import { UserModule } from './modules/user.module';
import { MessageModule } from './modules/message.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/social'),
    AuthModule,
    AutoIdModule,
    UserModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
