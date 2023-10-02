import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "src/schemas/message.schema";
import { AutoIdService } from "./auto-id.service";
import { MessageDto } from "src/dto/message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    private readonly autoIdService: AutoIdService
  ) {}

  async getAll(): Promise<Message[]> {
    return this.messageModel.find().exec()
  }

  async getAllByUser(userId: number): Promise<Message[]> {
    return this.messageModel.find({ author: userId }).exec()
  }

  async create(userData: any, messageDto: MessageDto): Promise<Message> {    
    const message = new this.messageModel(messageDto)
    message.author = userData.userId
    message.id = await this.autoIdService.getNextSequence('message')
    return await message.save()
  }

  async delete(messageId: number): Promise<void> {
    await this.messageModel.findOneAndRemove({ id: messageId })
  }
}