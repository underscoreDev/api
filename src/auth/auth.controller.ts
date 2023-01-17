import { AuthService } from "src/auth/auth.service";
import { User } from "src/users/entities/user.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "User successfully created.", type: User })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return req.user;
  }
}
