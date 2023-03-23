import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Guard } from "src/utils/guard.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "src/brand/entities/brand.entity";
import { QueryDto, SortEnum } from "src/utils/pagination.utils";
import { CreateBrandDto, BrandDto, UpdateBrandDto } from "src/brand/dto/brand.dto";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>) {}

  async create(createBrandDto: CreateBrandDto): Promise<StandardResponse<BrandDto>> {
    const newBrand = this.brandRepository.create(createBrandDto);
    await newBrand.save();

    return ResponseManager.StandardResponse({
      code: 201,
      status: "success",
      message: "brand created successfully",
      data: newBrand,
    });
  }

  async findAll(query: QueryDto) {
    const sortField = query.sortField;
    const sortOrder = query.sortOrder;

    const brands = await this.brandRepository.find({
      order: {
        [sortField]: sortOrder === SortEnum.descending ? SortEnum.descending : SortEnum.ascending,
      },
    });

    return ResponseManager.StandardResponse({
      code: 200,
      message: "brand fetched successfully",
      data: brands,
      status: "success",
    });
  }

  async findOne(id: string): Promise<StandardResponse<Brand>> {
    const brand = await this.brandRepository.findOneBy({ id });

    Guard.AgainstNotFound(brand, "brand");

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Brand retrieved Successfully",
      data: brand,
    });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<StandardResponse<Brand>> {
    const brand = await this.brandRepository.findOneBy({ id });

    Guard.AgainstNotFound(brand, "brand");

    await this.brandRepository.update({ id }, { ...updateBrandDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Brand Updated Successfully",
      data: brand,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const brand = await this.brandRepository.findOneBy({ id });

    Guard.AgainstNotFound(brand, "brand");

    await this.brandRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "Brand deleted Successfully",
      data: null,
    });
  }
}
