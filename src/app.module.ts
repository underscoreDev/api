import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { userProvider } from "src/users/user.provider";
import { ReviewsModule } from "src/reviews/reviews.module";
import { SessionEntity } from "src/entities/session.entity";
import { JwtStrategy } from "src/auth/startegy/jwt.strategy";
import { DatabaseModule } from "src/database/database.module";
import { LocalStrategy } from "src/auth/startegy/local.strategy";
import { SessionSerializer } from "src/auth/serializers/session.serializers";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),

    AuthModule,
    UsersModule,
    ReviewsModule,
    DatabaseModule,
  ],
  providers: [
    ...userProvider,
    JwtStrategy,
    JwtService,
    LocalStrategy,
    SessionSerializer,
    AuthService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  async getSessionEntity() {
    return this.dataSource.getRepository(SessionEntity);
  }
}
