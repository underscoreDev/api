import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto, ProductDto } from "./dto/product.dto";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { StandardResponse } from "src/utils/responseManager.utils";
import { SessionGuard } from "src/auth/guards/session.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { Product } from "src/product/entities/product.entity";
import { Paginate, QueryDto } from "src/utils/pagination.utils";

@Controller("product")
@ApiTags("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(SessionGuard)
  @Roles(Role.Admin, Role.Manager)
  @ApiBody({ description: "Create a new product", type: CreateProductDto })
  @ApiCreatedResponse({ description: "product created successfully", type: ProductDto })
  create(@Body() createProductDto: CreateProductDto): Promise<StandardResponse<ProductDto>> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ description: "Products retrieved successfully", type: Paginate })
  async findAll(@Query() query: QueryDto): Promise<StandardResponse<Product[]>> {
    return await this.productService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ description: "Product retrieved successfully", type: ProductDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<ProductDto>> {
    return await this.productService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(SessionGuard)
  @Roles(Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "Product Updated successfully", type: ProductDto })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<StandardResponse<Product>> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  @UseGuards(SessionGuard)
  @Roles(Role.Admin, Role.Manager)
  @ApiNoContentResponse({
    description: "Product deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.productService.remove(id);
  }
}
