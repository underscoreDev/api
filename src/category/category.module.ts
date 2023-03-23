import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "src/category/category.service";
import { Category } from "src/category/entities/category.entity";
import { CategoryController } from "src/category/category.controller";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
