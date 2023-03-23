import { In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Guard } from "src/utils/guard.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/product/entities/product.entity";
import { ICartItem, Order } from "src/order/entities/order.entity";
import { CreateOrderDto, UpdateOrderDto } from "src/order/dto/order.dto";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<StandardResponse<any>> {
    const user = await this.userRepository.findOneBy({ id: userId });
    Guard.AgainstNotFound(user, "user");

    const pIds = createOrderDto.cartItems.map((p) => p.productId);

    const products = this.productsRepository.findBy({ id: In(pIds) });

    const productWithQuantities: ICartItem[] = createOrderDto.cartItems.map((prod, index) => {
      return {
        product: products[index],
        quantity: prod.quantity,
      };
    });

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
      data: { pIds, products, productWithQuantities, newOrder },
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
