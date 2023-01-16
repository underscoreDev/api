import { AuthService } from "src/auth/auth.service";
import { User } from "src/users/entities/user.entity";
import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "User successfully created.", type: User })
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @Post("login")
  login() {
    return "login";
  }
}