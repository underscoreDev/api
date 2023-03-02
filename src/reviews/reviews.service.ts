import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReviewDto, ReviewDto, UpdateReviewsDto } from "src/reviews/dto/review.dto";
import { Review } from "src/reviews/entities/reviews.entity";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";
import { QueryDto, SortEnum, paginateResponse } from "src/utils/pagination.utils";
import { Guard } from "src/utils/guard.utils";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/product/entities/product.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: string,
  ): Promise<StandardResponse<ReviewDto>> {
    const user = await this.userRepository.findOneBy({ id: userId });
    Guard.AgainstNotFound(user, "user");

    const product = await this.productRepository.findOneBy({ id: createReviewDto.productId });
    Guard.AgainstNotFound(product, "product");

    const newReview = this.reviewsRepository.create({ ...createReviewDto, user, product });
    await newReview.save();

    return ResponseManager.StandardResponse({
      code: 201,
      status: "success",
      message: "review created successfully",
      data: newReview,
    });
  }

  async findAll(query: QueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (page - 1) * limit;
    const sortField = query.sortField;
    const sortOrder = query.sortOrder;

    const reviews = await this.reviewsRepository.findAndCount({
      take: limit,
      skip,
      order: {
        [sortField]: sortOrder === SortEnum.descending ? SortEnum.descending : SortEnum.ascending,
      },
    });

    return ResponseManager.StandardResponse({
      code: 200,
      message: "review fetched successfully",
      ...paginateResponse(reviews, page, limit),
    });
  }

  async findOne(id: string): Promise<StandardResponse<Review>> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: { user: true, product: true },
    });

    Guard.AgainstNotFound(review, "review");

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Review retrieved Successfully",
      data: review,
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewsDto): Promise<StandardResponse<Review>> {
    const review = await this.reviewsRepository.findOneBy({ id });

    Guard.AgainstNotFound(review, "review");

    await this.reviewsRepository.update({ id }, { ...updateReviewDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Review Updated Successfully",
      data: review,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const review = await this.reviewsRepository.findOneBy({ id });

    Guard.AgainstNotFound(review, "review");

    await this.reviewsRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "Review deleted Successfully",
      data: null,
    });
  }
}
