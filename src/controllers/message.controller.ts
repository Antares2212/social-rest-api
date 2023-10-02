import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { MessageDto } from "src/dto/message.dto";
import { TokenGuard } from "src/guards/auth.guard";
import { Message } from "src/schemas/message.schema";
import { MessageService } from "src/services/message.service";

@Controller('message')
export class MessageController {
  constructor(private readonly messageServie: MessageService) {}

  @Get('/all')
  getAll(): Promise<Message[]> {
    return this.messageServie.getAll()
  }

  @UseGuards(TokenGuard)
  @Get('/all/:id')
  getAllByUser(
    @Param('id') id: number
  ): Promise<Message[]> {
    return this.messageServie.getAllByUser(id)
  }

  @UseGuards(TokenGuard)
  @Post('/create')
  create(
    @Request() req: any,
    @Body() messageDto: MessageDto
  ): Promise<Message> {    
    return this.messageServie.create(req.user, messageDto)
  }

  @Delete('/delete/:id')
  delete(
    @Param('id') id: number
  ) {
    this.messageServie.delete(id)
  }
}