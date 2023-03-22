import BaseModel from "src/entities/baseModel.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";
import { ShippingInfo, OrderStatus, CartItem } from "src/order/dto/order.dto";

@Entity()
export class Order extends BaseModel {
  @Column({ nullable: false, type: "jsonb" })
  shippingInfo: ShippingInfo;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.placed, nullable: false })
  orderStatus: OrderStatus;

  @Column({ nullable: false })
  total: number;

  @Column({ nullable: false })
  shippingFee: number;

  @Column({ nullable: false })
  grandTotal: number;

  @Column({ type: "jsonb", nullable: false })
  cartItems: CartItem[];

  @ManyToOne(() => User, (user) => user.orders, { nullable: false, eager: true })
  user: User;

  @BeforeInsert()
  calcTotal() {
    const total = this.cartItems.reduce(
      (previousValue, currentValue) =>
        (previousValue += currentValue.quantity * currentValue.product.price),
      0,
    );

    const shippingFee = 2000;

    const grandTotal = total + shippingFee;

    this.shippingFee = shippingFee;
    this.total = total;
    this.grandTotal = grandTotal;
  }
}
