import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}

export interface IReview {
  title: string;
  description: string;
  rating: number;
}
