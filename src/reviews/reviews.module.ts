import { Module } from "@nestjs/common";
import { ReviewsService } from "src/reviews/reviews.service";
import { ReviewsController } from "src/reviews/reviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/reviews.entity";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Review])],
})
export class ReviewsModule {}
