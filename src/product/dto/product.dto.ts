import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/swagger";
import { Brand } from "src/product/entities/brand.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { Category } from "src/product/entities/category.entity";
import { SubCategory } from "src/product/entities/subCategory.entity";
import { IsNotEmpty, IsString, IsNumber, IsNotEmptyObject } from "class-validator";

export class ProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  new: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  features: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  inStock: boolean;

  @ApiProperty()
  quantityInStock: number;

  @ApiProperty()
  coverImage: string;

  @ApiProperty({
    example: {
      image1: "https://dog-image-1.jpg",
      image2: "https://dog-image-2.jpg",
    },
  })
  imageGallery: JSON;

  @ApiProperty({
    example: {
      specifications: { ram: "6gb", rom: "128gb" },
      includedItems: [{ quantity: 1, item: "phone case" }],
    },
  })
  metaData: JSON;

  @ApiProperty()
  averageRating: number;

  @ApiProperty()
  noOfRatings: number;

  @ApiProperty()
  reviews: Review[];

  @ApiProperty()
  brand: Brand;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  subCategory: SubCategory;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  features: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantityInStock: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ApiProperty({
    example: {
      image1: "https://dog-image-1.jpg",
      image2: "https://dog-image-2.jpg",
    },
  })
  @IsNotEmptyObject()
  imageGallery: JSON;

  @ApiProperty({
    description: "Additional Product Information",
    example: {
      specifications: { ram: "6gb", rom: "128gb" },
      includedItems: [{ quantity: 1, item: "phone case" }],
    },
  })
  @IsNotEmptyObject({ nullable: false })
  metaData: JSON;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
