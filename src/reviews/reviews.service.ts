import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/reviews/entities/reviews.entity";
import { IReview } from "./dto/create-review.dto";

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private reviewsRepository: Repository<Review>) {}

  async getAllReviews() {
    return await this.reviewsRepository.find({ relations: ["user"] });
  }

  async createReview(newReviewProps: IReview) {
    return await this.reviewsRepository.save(newReviewProps);
  }
}
