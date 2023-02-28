import { Repository } from "typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IReview } from "src/reviews/dto/create-review.dto";
import { Review } from "src/reviews/entities/reviews.entity";

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
