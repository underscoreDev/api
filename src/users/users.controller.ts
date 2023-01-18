import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Request } from "@nestjs/common";

@Controller("users")
@ApiTags("Users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response<User[]>> {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json({ status: "success", count: users.length, data: users });
  }

  @Get(":id")
  async findOne(@Request() req: any, @Param("id", new ParseUUIDPipe()) id: string): Promise<User> {
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
