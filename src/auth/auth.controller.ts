import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { CreateUserDto } from '../dto/user-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: RequestWithUser) {  
    const user = req.user
    return user;
  }
  
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) { 
    return this.AuthService.registerUser(createUserDto)
  }
} 
