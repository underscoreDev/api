import { Like, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Guard } from "src/utils/guard.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/entities/product.entity";
import { QueryDto, paginateResponse } from "src/utils/pagination.utils";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";
import { CreateProductDto, ProductDto, UpdateProductDto } from "src/product/dto/product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<StandardResponse<ProductDto>> {
    const newProduct = this.productRepository.create(createProductDto);
    await newProduct.save();

    return ResponseManager.StandardResponse({
      code: 201,
      status: "success",
      message: "product created successfully",
      data: newProduct,
    });
  }

  async findAll(query: QueryDto) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const search = query.search || "";

    const products = await this.productRepository.findAndCount({
      where: [{ name: Like(`%${search}%`), slug: Like(`%${search}%`) }],
      take: limit,
      skip,
    });

    return ResponseManager.StandardResponse({
      code: 200,
      message: "product fetched successfully",
      ...paginateResponse(products, page, limit),
    });
  }

  async findOne(id: string): Promise<StandardResponse<Product>> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { brand: true, reviews: true, subCategory: true, category: true },
    });

    Guard.AgainstNotFound(product, "product");

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Product retrieved Successfully",
      data: product,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<StandardResponse<Product>> {
    const product = await this.productRepository.findOneBy({ id });

    Guard.AgainstNotFound(product, "product");

    await this.productRepository.update({ id }, { ...updateProductDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Product Updated Successfully",
      data: product,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const product = await this.productRepository.findOneBy({ id });

    Guard.AgainstNotFound(product, "product");

    await this.productRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "Product deleted Successfully",
      data: null,
    });
  }
}
