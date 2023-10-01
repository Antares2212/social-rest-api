import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { AutoIdSchema } from "src/schemas/auto-id.schema";
import { AutoIdService } from "src/services/auto-id.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AutoIdService.name, schema: AutoIdSchema },
    ])
  ],
  controllers: [],
  providers: [AutoIdService]
})

export class AutoIdModule {}