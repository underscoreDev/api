import { ApiNoContentResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/users.service";
import { RolesGuard } from "src/auth/guards/role.guard";
import { SessionGuard } from "src/auth/guards/session.guard";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
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
  Query,
} from "@nestjs/common";
import { Request as ERequest } from "express";
import { User } from "src/users/entities/user.entity";
import session, { Session as ExpressSession } from "express-session";
import { StandardResponse } from "src/utils/responseManager.utils";
import { QueryDto } from "src/utils/pagination.utils";

export type UserSession = ExpressSession & Record<"user", any>;

@Controller("users")
@ApiTags("Users")
@UseGuards(SessionGuard, RolesGuard) // use one of either sessionGuard or JWTGuard depending on your preference
// @UseGuards(SessionGuard || JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "Users retrieved successfully", type: [User] })
  async findAll(@Query() query: QueryDto): Promise<StandardResponse<User[]>> {
    return await this.usersService.findAll(query);
  }

  @Get(":id")
  @Roles(Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "user updated successfully", type: User })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<User>> {
    return await this.usersService.findOne(id);
  }

  @Get("me")
  @ApiOkResponse({ description: "user retrieved successfully", type: User })
  async findMe(@Session() session: UserSession): Promise<StandardResponse<User>> {
    console.log(session);
    return await this.usersService.findOne(session.user.id);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "user updated successfully", type: User })
  update(@Param("id", new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiNoContentResponse({
    description: "Review deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
