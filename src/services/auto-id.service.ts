import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutoId, AutoIdDocument } from 'src/schemas/auto-id.schema';

@Injectable()
export class AutoIdService {
  constructor(@InjectModel(AutoId.name) private readonly AutoIdModel: Model<AutoIdDocument>) {}
  
  async getNextSequence(name: string) {
    const autoId = await this.AutoIdModel.findOneAndUpdate(
      { name: name },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    )

    return autoId.value
  }
}