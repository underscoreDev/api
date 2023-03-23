import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "src/order/order.service";
import { User } from "src/users/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { OrderController } from "src/order/order.controller";
import { Product } from "src/product/entities/product.entity";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order, Product, User])],
})
export class OrderModule {}
