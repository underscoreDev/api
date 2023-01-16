import { AuthService } from "src/auth/auth.service";
import { User } from "src/users/entities/user.entity";
import { Controller, Post, Body, ValidationPipe, UseFilters } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { HttpExceptionFilter } from "../utils/all-exception-filter";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "User successfully created.", type: User })
  // @UseFilters(HttpExceptionFilter)
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @Post("login")
  login() {
    return "login";
  }
}
