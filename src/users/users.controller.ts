import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/users.service";
import { RolesGuard } from "src/auth/guards/role.guard";
import { SessionGuard } from "src/auth/guards/session.guard";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { ClassSerializerInterceptor, Request, UseInterceptors } from "@nestjs/common";
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Session,
} from "@nestjs/common";
import { Request as ERequest } from "express";
import { User } from "./entities/user.entity";
import session, { Session as ExpressSession } from "express-session";

export type UserSession = ExpressSession & Record<"user", any>;

@Controller("users")
@ApiTags("Users")
@UseGuards(SessionGuard, RolesGuard) // use one of either sessionGuard or JWTGuard depending on your preference
// @UseGuards(SessionGuard || JwtAuthGuard, RolesGuard)
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
  async findOne(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Request() req: ERequest & { user: User },
    @Session() session: UserSession,
  ) {
    console.log(req.user);
    console.log(session);
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
