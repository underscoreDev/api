import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";
import { User } from "src/users/entities/user.entity";
import { ProductDto } from "src/product/dto/product.dto";
import { IsNotEmpty, IsNumber, Max, Min, IsString } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ minimum: 0, maximum: 5 })
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty()
  productId: string;
}

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ minimum: 0, maximum: 5 })
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty()
  user: User;

  @ApiProperty()
  product: ProductDto;
}

export class UpdateReviewsDto extends PartialType(CreateReviewDto) {}
