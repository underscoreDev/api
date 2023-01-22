import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/users.service";
import { RolesGuard } from "src/auth/guards/role.guard";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { ClassSerializerInterceptor, Request, UseInterceptors } from "@nestjs/common";
import { SessionGuard } from "../auth/guards/session.guard";
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";

@Controller("users")
@ApiTags("Users")
@UseGuards(SessionGuard || JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { status: "success", count: users.length, data: users };
  }

  @Get(":id")
  @Roles(Role.User, Role.Manager)
  async findOne(@Request() req: any, @Param("id", new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    return { status: "success", data: user };
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
