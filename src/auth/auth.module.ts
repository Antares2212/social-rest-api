import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { AutoId, AutoIdSchema } from 'src/schemas/auto-id.schema';
import { AutoIdService } from 'src/services/auto-id.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}, { name: AutoId.name, schema: AutoIdSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, JwtService, AutoIdService]
})
export class AuthModule {} 
