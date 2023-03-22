import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Guard } from "src/utils/guard.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/order/entities/order.entity";
import { CreateOrderDto, OrderDto, UpdateOrderDto } from "src/order/dto/order.dto";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<StandardResponse<OrderDto>> {
    const newOrder = this.orderRepository.create(createOrderDto);
    await newOrder.save();

    return ResponseManager.StandardResponse({
      code: 201,
      status: "success",
      message: "order created successfully",
      data: newOrder,
    });
  }

  async findAll() {
    const orders = await this.orderRepository.find();

    return ResponseManager.StandardResponse({
      code: 200,
      message: "orders fetched successfully",
      data: orders,
      status: "success",
    });
  }

  async findOne(id: string): Promise<StandardResponse<Order>> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    Guard.AgainstNotFound(order, "order");

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Order retrieved Successfully",
      data: order,
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<StandardResponse<Order>> {
    const order = await this.orderRepository.findOneBy({ id });

    Guard.AgainstNotFound(order, "order");

    await this.orderRepository.update({ id }, { ...updateOrderDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "Order Updated Successfully",
      data: order,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const order = await this.orderRepository.findOneBy({ id });

    Guard.AgainstNotFound(order, "order");

    await this.orderRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "Order deleted Successfully",
      data: null,
    });
  }
}
