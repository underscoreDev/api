import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/users/entities/user.entity";
import { AuthController } from "src/auth/auth.controller";
import { LocalStrategy } from "src/auth/startegy/local.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
