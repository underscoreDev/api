import { Module } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { UsersController } from "src/users/users.controller";
import { userProvider } from "./user.provider";

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...userProvider],
})
export class UsersModule {}
