import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Guard } from "src/utils/guard.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";
import { CreateCategoryDto, CategoryDto, UpdateCategoryDto } from "src/category/dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<StandardResponse<CategoryDto>> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    await newCategory.save();

    return ResponseManager.StandardResponse({
      code: 201,
      status: "success",
      message: "category created successfully",
      data: newCategory,
    });
  }

  async findAll() {
    const categorys = await this.categoryRepository.find();

    return ResponseManager.StandardResponse({
      code: 200,
      message: "category fetched successfully",
      data: categorys,
      status: "success",
    });
  }

  async findOne(id: string): Promise<StandardResponse<Category>> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { childrenCategories: true },
    });

    Guard.AgainstNotFound(category, "category");

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Category retrieved Successfully",
      data: category,
    });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<StandardResponse<Category>> {
    const category = await this.categoryRepository.findOneBy({ id });

    Guard.AgainstNotFound(category, "category");

    await this.categoryRepository.update({ id }, { ...updateCategoryDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Category Updated Successfully",
      data: category,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const category = await this.categoryRepository.findOneBy({ id });

    Guard.AgainstNotFound(category, "category");

    await this.categoryRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "Category deleted Successfully",
      data: null,
    });
  }
}
