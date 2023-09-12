import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schema/user.schema'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  private generateToken(user: any): string {
    const payload = { username: user.username, sub: user._id }
    const secretKey = crypto.randomBytes(32).toString('hex')
    const options = { expiresIn: '24h' }
    return jwt.sign(payload, secretKey, options)
  }
  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec()

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Invalid Credential' },
        HttpStatus.NOT_FOUND
      )
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      const token = this.generateToken(result)
      return { token }
    }
  }

  async registerUser(username: string, email: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new this.userModel({
      username,
      email,
      password: hashedPassword
    })

    return user.save()
  }
}