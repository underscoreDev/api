import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class SubCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  parentCategory: Category;
}

export class CreateSubCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsUUID()
  parentCategoryId: string;
}

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}
