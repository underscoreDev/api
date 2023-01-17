import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthController } from "src/auth/auth.controller";
import { User } from "src/users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalStrategy } from "./startegy/local.strategy";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
