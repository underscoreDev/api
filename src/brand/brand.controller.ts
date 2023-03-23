import { QueryDto } from "src/utils/pagination.utils";
import { BrandService } from "src/brand/brand.service";
import { Brand } from "src/brand/entities/brand.entity";
import { SessionGuard } from "src/auth/guards/session.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { StandardResponse } from "src/utils/responseManager.utils";
import { CreateBrandDto, BrandDto, UpdateBrandDto } from "src/brand/dto/brand.dto";
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

@Controller("brand")
@UseGuards(SessionGuard)
@Roles(Role.Admin, Role.Manager)
@ApiTags("Brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ description: "Create a new brand", type: CreateBrandDto })
  @ApiCreatedResponse({ description: "brand created successfully", type: BrandDto })
  create(@Body() createBrandDto: CreateBrandDto): Promise<StandardResponse<BrandDto>> {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "Brand retrieved successfully", type: [BrandDto] })
  async findAll(@Query() query: QueryDto): Promise<StandardResponse<Brand[]>> {
    return await this.brandService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ description: "Brand retrieved successfully", type: BrandDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<BrandDto>> {
    return await this.brandService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "Brand Updated successfully", type: BrandDto })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<StandardResponse<Brand>> {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(":id")
  @ApiNoContentResponse({
    description: "Brand deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.brandService.remove(id);
  }
}
