import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserCreateDto } from "src/dto/user-create.dto";
import { UserDto } from "src/dto/user.dto";
import { User } from "src/schemas/user.schema";
import { UserService } from "src/services/user.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getAll()
  : Promise<User[]> {
    return this.userService.getAll()
  }

  @Get('/:id')
  getOne(
    @Param('id') id: number
  ): Promise<User> {
    return this.userService.getOne(id)
  }

  @Post('/create')
  create(
    @Body() userCreateDto: UserCreateDto
  ): Promise<User> {
    return this.userService.create(userCreateDto)
  }
  
  @Put('/update/:id')
  update(
    @Param('id') id: number,
    @Body() userDto: UserDto
  ): Promise<User> {
    return this.userService.update(id, userDto)
  }

  @Delete('/delete/:id')
  delete(
    @Param('id') id: number
  ) {
    this.userService.delete(id)
  }
}