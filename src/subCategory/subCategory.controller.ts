import { QueryDto } from "src/utils/pagination.utils";
import { SessionGuard } from "src/auth/guards/session.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { StandardResponse } from "src/utils/responseManager.utils";
import { SubCategoryService } from "src/subCategory/subCategory.service";
import { SubCategory } from "src/subCategory/entities/subCategory.entity";
import {
  SubCategoryDto,
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
} from "src/subCategory/dto/subCategory.dto";
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
  Query,
} from "@nestjs/common";

@Controller("subCategory")
@UseGuards(SessionGuard)
@ApiTags("Sub-Category")
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @HttpCode(201)
  @Roles(Role.User)
  @ApiBody({ description: "Create a new subCategory", type: CreateSubCategoryDto })
  @ApiCreatedResponse({ description: "subCategory created successfully", type: SubCategoryDto })
  create(
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<StandardResponse<SubCategoryDto>> {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  @ApiOkResponse({ description: "SubCategory retrieved successfully", type: [SubCategoryDto] })
  async findAll(@Query() query: QueryDto): Promise<StandardResponse<SubCategory[]>> {
    return await this.subCategoryService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ description: "SubCategory retrieved successfully", type: SubCategoryDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<SubCategoryDto>> {
    return await this.subCategoryService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(SessionGuard)
  @Roles(Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "SubCategory Updated successfully", type: SubCategoryDto })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<StandardResponse<SubCategory>> {
    return this.subCategoryService.update(id, updateSubCategoryDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiNoContentResponse({
    description: "SubCategory deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.subCategoryService.remove(id);
  }
}
