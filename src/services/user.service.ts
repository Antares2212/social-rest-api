import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { AutoIdService } from "./auto-id.service";
import { UserCreateDto } from "src/dto/user-create.dto";
import * as bcrypt from 'bcrypt';
import { UserDto } from "src/dto/user.dto";
import { UserNotFoundExeption } from "src/errors";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) 
    private readonly userModel: Model<UserDocument>,
    private readonly autoIdService: AutoIdService
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find()
  }

  async getOne(userId: number): Promise<User> {
    const user = await this.userModel.findOne({ id: userId })

    if (!user) throw new UserNotFoundExeption()

    return user
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    const { password, ...result } = userCreateDto
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = new this.userModel({ password: hashedPassword, ...result });
    user.id = await this.autoIdService.getNextSequence('user')
    return await user.save()
  }

  async update(userId: number, userDto: UserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { id: userId },
      userDto,
      { new: true }
    )    

    if (!user) throw new UserNotFoundExeption() 
    
    return user
  }

  async delete(userId: number): Promise<void> {
    await this.userModel.findOneAndRemove({ id: userId })
  }
}