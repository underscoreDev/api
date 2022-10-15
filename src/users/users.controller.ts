import { Response } from "express";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
  HttpStatus,
} from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response<User>> {
    const createdUser = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ status: "success", data: createdUser });
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<User[]>> {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json({ status: "success", count: users.length, data: users });
  }

  @Get(":id")
  async findOne(@Param("id", new ParseUUIDPipe()) id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
