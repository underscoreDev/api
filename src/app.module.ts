import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/entities/user.entity";
import { ReviewsModule } from "src/reviews/reviews.module";
import { Review } from "src/reviews/entities/reviews.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: "nestjstest",
      entities: [User, Review],
      synchronize: process.env.NODE_ENV === "development",
      logging: true,
    }),
    UsersModule,
    ReviewsModule,
  ],
})
export class AppModule {}
