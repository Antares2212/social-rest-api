import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RequestWithUser } from './schema/user.interface';

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
  async register(@Request() req: RequestWithUser) {
    const { username, email, password } = req.body
    return this.AuthService.registerUser(username, email, password)
  }
}
