import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "src/reviews/entities/reviews.entity";
import { ReviewsService } from "src/reviews/reviews.service";
import { ReviewsController } from "src/reviews/reviews.controller";
import { reviewProvider } from "./reviews.provider";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ...reviewProvider],
  // imports: [TypeOrmModule.forFeature([Review])],
})
export class ReviewsModule {}
