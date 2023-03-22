import { OrderService } from "src/order/order.service";
import { Order } from "src/order/entities/order.entity";
import { SessionGuard } from "src/auth/guards/session.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { StandardResponse } from "src/utils/responseManager.utils";
import { CreateOrderDto, OrderDto, UpdateOrderDto } from "src/order/dto/order.dto";
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

@Controller("order")
@UseGuards(SessionGuard)
@ApiTags("Order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ description: "Create a new order", type: CreateOrderDto })
  @ApiCreatedResponse({ description: "order created successfully", type: OrderDto })
  create(@Body() createOrderDto: CreateOrderDto): Promise<StandardResponse<OrderDto>> {
    return this.orderService.create(createOrderDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Get()
  @Roles(Role.User, Role.Admin, Role.Manager)
  @ApiOkResponse({ description: "Order retrieved successfully", type: [OrderDto] })
  async findAll(): Promise<StandardResponse<Order[]>> {
    return await this.orderService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Order retrieved successfully", type: OrderDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<OrderDto>> {
    return await this.orderService.findOne(id);
  }

  @Roles(Role.Admin, Role.Manager)
  @Patch(":id")
  @ApiOkResponse({ description: "Order Updated successfully", type: OrderDto })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<StandardResponse<Order>> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Delete(":id")
  @ApiNoContentResponse({
    description: "Order deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.orderService.remove(id);
  }
}
