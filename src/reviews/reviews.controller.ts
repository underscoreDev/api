import { Response } from "express";
import { HttpStatus } from "@nestjs/common/enums";
import { ReviewsService } from "src/reviews/reviews.service";
import { Review } from "src/reviews/entities/reviews.entity";
import { Controller, Get, Res, Body, Post } from "@nestjs/common";
import { CreateReviewDto } from "src/reviews/dto/create-review.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("reviews")
@ApiTags("Reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getAllReviews(@Res() res: Response): Promise<Response<Review[]>> {
    const reviews = await this.reviewsService.getAllReviews();
    return res
      .status(HttpStatus.OK)
      .json({ status: "success", count: reviews.length, data: reviews });
  }

  @Post()
  async createReview(@Body() review: CreateReviewDto, @Res() res: Response) {
    const newReview = await this.reviewsService.createReview(review);
    return res.status(HttpStatus.OK).json({ status: "success", data: newReview });
  }
}
