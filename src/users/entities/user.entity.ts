import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { Review } from "src/reviews/entities/reviews.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
