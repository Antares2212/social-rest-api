import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  id: number

  @Prop({ required: true })
  username: string

  @Prop()
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  avatar: string

  @Prop({ default: 'user' })
  roles: string

  @Prop()
  about: string

  @Prop()
  country: string

  @Prop()
  birthday: Date

  @Prop()
  fullname: string
}

export const UserSchema = SchemaFactory.createForClass(User)