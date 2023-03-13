import BaseModel from "src/entities/baseModel.entity";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Order extends BaseModel {
  @Column({ nullable: false, type: "jsonb" })
  address: JSON;

  @Column({ nullable: false })
  total: number;

  @Column({ nullable: false })
  shippingFee: number;

  @Column({ nullable: false })
  grandTotal: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders, { nullable: false, eager: true })
  user: User;
}
