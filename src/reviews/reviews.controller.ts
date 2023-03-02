import { QueryDto } from "src/utils/pagination.utils";
import { UserSession } from "src/users/users.controller";
import { ReviewsService } from "src/reviews/reviews.service";
import { Review } from "src/reviews/entities/reviews.entity";
import { SessionGuard } from "src/auth/guards/session.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { StandardResponse } from "src/utils/responseManager.utils";
import { CreateReviewDto, ReviewDto, UpdateReviewsDto } from "src/reviews/dto/review.dto";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Body,
  Post,
  HttpCode,
  Patch,
  Delete,
  ParseUUIDPipe,
  Param,
  UseGuards,
  Query,
  Session,
} from "@nestjs/common";

@Controller("reviews")
@UseGuards(SessionGuard)
@ApiTags("Reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @HttpCode(201)
  @Roles(Role.User)
  @ApiBody({ description: "Create a new review", type: CreateReviewDto })
  @ApiCreatedResponse({ description: "review created successfully", type: ReviewDto })
  create(
    @Session() session: UserSession,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<StandardResponse<ReviewDto>> {
    return this.reviewsService.create(createReviewDto, session.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "Reviews retrieved successfully", type: [ReviewDto] })
  async findAll(@Query() query: QueryDto): Promise<StandardResponse<Review[]>> {
    return await this.reviewsService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ description: "Review retrieved successfully", type: ReviewDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<ReviewDto>> {
    return await this.reviewsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(SessionGuard)
  @Roles(Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "Review Updated successfully", type: ReviewDto })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewsDto,
  ): Promise<StandardResponse<Review>> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(":id")
  @UseGuards(SessionGuard)
  @Roles(Role.Admin, Role.Manager)
  @ApiNoContentResponse({
    description: "Review deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.reviewsService.remove(id);
  }
}
