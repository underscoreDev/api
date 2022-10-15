import { Controller, Get, Res } from "@nestjs/common";
import { Body, Post } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { Response } from "express";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "src/reviews/dto/create-review.dto";
import { Review } from "src/reviews/entities/reviews.entity";

@Controller("reviews")
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
