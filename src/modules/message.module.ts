import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageController } from "src/controllers/message.controller";
import { Message, MessageSchema } from "src/schemas/message.schema";
import { MessageService } from "src/services/message.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema }
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService]
})

export class MessageModule {}