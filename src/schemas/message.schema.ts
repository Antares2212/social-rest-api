import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "./user.schema";

export type MessageDocument = Message & Document

@Schema()
export class Message {
  @Prop({ required: true, unique: true })
  id: number

  @Prop({ required: true })
  text: string

  @Prop({ type: Number, ref: 'User'})
  author: User

  @Prop({ default: new Date() })
  date: Date
}

export const MessageSchema = SchemaFactory.createForClass(Message)