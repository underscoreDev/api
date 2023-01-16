import { Controller, Post, Body } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "User successfully created.", type: User })
  register(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }

  @Post("login")
  login() {
    return "login";
  }
}
