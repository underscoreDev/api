import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { ReviewsService } from "src/reviews/reviews.service";
import { Product } from "src/product/entities/product.entity";
import { ReviewsController } from "src/reviews/reviews.controller";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Review, User, Product])],
})
export class ReviewsModule {}
