import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AutoIdDocument = AutoId & Document

@Schema()
export class AutoId {
  @Prop({ required: true })
  name: string

  @Prop({ default: 0 })
  value: number
}

export const AutoIdSchema = SchemaFactory.createForClass(AutoId)