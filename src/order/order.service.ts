import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Guard } from "src/utils/guard.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { CreateOrderDto, UpdateOrderDto } from "src/order/dto/order.dto";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<StandardResponse<Order>> {
    const user = await this.userRepository.findOneBy({ id: userId });
    Guard.AgainstNotFound(user, "user");

    const productWithQuantities = await Promise.all(
      createOrderDto.cartItems.map(async (prod) => {
        return {
          product: await this.productsRepository.findOneBy({ id: prod.productId }),
          quantity: prod.quantity,
        };
      }),
    );

    const newOrder = this.orderRepository.create({
      shippingInfo: createOrderDto.shippingInfo,
      user,
      cartItems: productWithQuantities,
    });

    await this.orderRepository.save(newOrder);

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

  async findOne(id: string): Promise<StandardResponse<any>> {
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
