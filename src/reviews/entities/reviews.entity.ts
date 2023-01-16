import BaseModel from "src/utils/model.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity({ name: "reviews" })
export class Review extends BaseModel {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user: User) => user.reviews)
  user: User;
}
