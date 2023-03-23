import { OrderService } from "src/order/order.service";
import { Order } from "src/order/entities/order.entity";
import { SessionGuard } from "src/auth/guards/session.guard";
import { Role, Roles } from "src/auth/decorators/role.decorator";
import { StandardResponse } from "src/utils/responseManager.utils";
import { CreateOrderDto, OrderDto, UpdateOrderDto } from "src/order/dto/order.dto";
import { UserSession } from "src/users/users.controller";
import { Session as ESession } from "express-session";
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
  Session,
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
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Session() { passport }: any,
  ): Promise<StandardResponse<OrderDto>> {
    return this.orderService.create(createOrderDto, passport.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "Order retrieved successfully", type: [OrderDto] })
  @Roles(Role.Admin, Role.Manager)
  async findAll(): Promise<StandardResponse<Order[]>> {
    return await this.orderService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Order retrieved successfully", type: OrderDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<OrderDto>> {
    return await this.orderService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "Order Updated successfully", type: UpdateOrderDto })
  @Roles(Role.Admin, Role.Manager)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<StandardResponse<Order>> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(":id")
  @ApiNoContentResponse({
    description: "Order deleted successfully",
    type: StandardResponse<null>,
  })
  @Roles(Role.Admin, Role.Manager)
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.orderService.remove(id);
  }
}
