import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/order/entities/order.entity";
import { OrderController } from "src/order/order.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  //   providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
