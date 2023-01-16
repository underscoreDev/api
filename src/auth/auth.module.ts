import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "src/auth/auth.controller";
import { User } from "src/users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
