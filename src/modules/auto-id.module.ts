import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoId, AutoIdSchema } from 'src/schemas/auto-id.schema';
import { AutoIdService } from 'src/services/auto-id.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AutoId.name, schema: AutoIdSchema }
    ]),
  ],
  providers: [AutoIdService],
  exports: [AutoIdService],
})
export class AutoIdModule {}