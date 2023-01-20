import { Request as ERequest } from "express";
import { LoginDto } from "src/users/dto/login.dto";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/users/entities/user.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import {
  HttpCode,
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "User successfully created.", type: User })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(200)
  async login(
    @Request() req: ERequest & { user: User },
    @Body() _loginDto: LoginDto,
  ): Promise<{ token: string; status: string }> {
    return await this.authService.login(req.user);
  }

  @Post()
  async confirmEmail(@Request() req: ERequest & { user: User }, @Body() loginDto: LoginDto) {
    return this.authService.confirmEmail(req.user);
  }
}
