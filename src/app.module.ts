import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/entities/user.entity";
import { ReviewsModule } from "src/reviews/reviews.module";
import { JwtStrategy } from "./auth/startegy/jwt.strategy";
import { Review } from "src/reviews/entities/reviews.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: "nestjstest",
      entities: [User, Review],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UsersModule,
    ReviewsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
