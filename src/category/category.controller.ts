import { CategoryService } from "src/category/category.service";
import { Category } from "src/category/entities/category.entity";
import { SessionGuard } from "src/auth/guards/session.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { StandardResponse } from "src/utils/responseManager.utils";
import { CreateCategoryDto, CategoryDto, UpdateCategoryDto } from "src/category/dto/category.dto";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Body,
  Post,
  HttpCode,
  Patch,
  Delete,
  ParseUUIDPipe,
  Param,
  UseGuards,
} from "@nestjs/common";

@Controller("category")
@UseGuards(SessionGuard)
@Roles(Role.Admin, Role.Manager)
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ description: "Create a new category", type: CreateCategoryDto })
  @ApiCreatedResponse({ description: "category created successfully", type: CategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<StandardResponse<CategoryDto>> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "Category retrieved successfully", type: [CategoryDto] })
  async findAll(): Promise<StandardResponse<Category[]>> {
    return await this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Category retrieved successfully", type: CategoryDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<CategoryDto>> {
    return await this.categoryService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "Category Updated successfully", type: CategoryDto })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<StandardResponse<Category>> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiNoContentResponse({
    description: "Category deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.categoryService.remove(id);
  }
}
