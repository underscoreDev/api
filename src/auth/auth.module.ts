import "dotenv/config";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { userProvider } from "src/users/user.provider";
import { AuthController } from "src/auth/auth.controller";
import { LocalStrategy } from "src/auth/startegy/local.strategy";
import { SessionSerializer } from "src/auth/serializers/session.serializers";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: "7d" } }),
  ],
  controllers: [AuthController],
  providers: [...userProvider, AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
