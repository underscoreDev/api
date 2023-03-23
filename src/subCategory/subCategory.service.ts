import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Guard } from "src/utils/guard.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { QueryDto, paginateResponse } from "src/utils/pagination.utils";
import { SubCategory } from "src/subCategory/entities/subCategory.entity";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";
import {
  CreateSubCategoryDto,
  SubCategoryDto,
  UpdateSubCategoryDto,
} from "src/subCategory/dto/subCategory.dto";

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<StandardResponse<SubCategoryDto>> {
    const category = await this.categoryRepository.findOneBy({
      id: createSubCategoryDto.parentCategoryId,
    });
    Guard.AgainstNotFound(category, "category");

    const newSubCategory = this.subCategoryRepository.create({
      ...createSubCategoryDto,
      parentCategory: category,
    });

    await newSubCategory.save();

    return ResponseManager.StandardResponse({
      code: 201,
      status: "success",
      message: "subCategory created successfully",
      data: newSubCategory,
    });
  }

  async findAll(query: QueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (page - 1) * limit;

    const subCategory = await this.subCategoryRepository.findAndCount({
      take: limit,
      skip,
    });

    return ResponseManager.StandardResponse({
      code: 200,
      message: "subCategory fetched successfully",
      ...paginateResponse(subCategory, page, limit),
    });
  }

  async findOne(id: string): Promise<StandardResponse<SubCategory>> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
      relations: { parentCategory: true },
    });

    Guard.AgainstNotFound(subCategory, "subCategory");

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "SubCategory retrieved Successfully",
      data: subCategory,
    });
  }

  async update(
    id: string,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<StandardResponse<SubCategory>> {
    const subCategory = await this.subCategoryRepository.findOneBy({ id });

    Guard.AgainstNotFound(subCategory, "subCategory");

    await this.subCategoryRepository.update({ id }, { ...updateSubCategoryDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "SubCategory Updated Successfully",
      data: subCategory,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const subCategory = await this.subCategoryRepository.findOneBy({ id });

    Guard.AgainstNotFound(subCategory, "subCategory");

    await this.subCategoryRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "SubCategory deleted Successfully",
      data: null,
    });
  }
}
