import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}

export interface IReview {
  title: string;
  description: string;
  rating: number;
}
