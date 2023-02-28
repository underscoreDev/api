import { Column, Entity, ManyToOne } from "typeorm";
import BaseModel from "src/entities/baseModel.entity";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/product/entities/product.entity";

@Entity({ name: "reviews" })
export class Review extends BaseModel {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  rating: number;

  @ManyToOne(() => User, (user: User) => user.reviews, { nullable: false })
  user: User;

  @ManyToOne(() => Product, (product: Product) => product.reviews, { nullable: false })
  product: Product;
}
