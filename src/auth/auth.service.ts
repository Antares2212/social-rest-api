import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose'

import * as bcrypt from 'bcrypt'

import { UserCreateDto } from '../dto/user-create.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { jwtConstants } from './../../constants';
import { UserNotFoundExeption } from 'src/errors';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  private generateToken(user: any): string {
    const payload = { username: user.username, sub: user._id };
    const secretKey = jwtConstants.secret
    const options = { expiresIn: '24h' };
    const token = this.jwtService.sign(payload, { secret: secretKey, ...options });
    return token;
  }
  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username }).exec()
    
    if (!user) throw new UserNotFoundExeption()    

    if (user && (await bcrypt.compareSync(password, user.password))) {
      const { password, ...result } = user      
      return this.generateToken(result)
    }
  }
  
  async registerUser(UserCreateDto: UserCreateDto): Promise<User> {
    return this.userService.create(UserCreateDto)
  }
} 