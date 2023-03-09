import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { SubCategoryService } from "src/subCategory/subCategory.service";
import { SubCategory } from "src/subCategory/entities/subCategory.entity";
import { SubCategoryController } from "src/subCategory/subCategory.controller";

@Module({
  providers: [SubCategoryService],
  controllers: [SubCategoryController],
  imports: [TypeOrmModule.forFeature([SubCategory, Category])],
})
export class SubCategoryModule {}
