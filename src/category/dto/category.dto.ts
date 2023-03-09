import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { SubCategory } from "src/product/entities/subCategory.entity";

export class CategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  childrenCategories: SubCategory[];
}

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
