import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { UsersModule } from "src/users/users.module";
import { BrandModule } from "src/brand/brand.module";
import { User } from "src/users/entities/user.entity";
import { Brand } from "src/brand/entities/brand.entity";
import { ProductModule } from "./product/product.module";
import { ReviewsModule } from "src/reviews/reviews.module";
import { SessionEntity } from "src/entities/session.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { Product } from "src/product/entities/product.entity";
import { CategoryModule } from "src/category/category.module";
import { Category } from "src/category/entities/category.entity";
import { SubCategoryModule } from "src/subCategory/subCategory.module";
import { SubCategory } from "src/subCategory/entities/subCategory.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      username: "postgres",
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: "nestjstest",
      entities: [User, Review, Brand, SubCategory, Category, Product, SessionEntity],
      synchronize: true,
      logging: false,
    }),

    AuthModule,
    UsersModule,
    ReviewsModule,
    ProductModule,
    BrandModule,
    CategoryModule,
    SubCategoryModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  async getSessionEntity() {
    return this.dataSource.getRepository(SessionEntity);
  }
}
