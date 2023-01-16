import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  phoneNumber: string;

  @Column({ default: false })
  @ApiProperty()
  isEmailVerified: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Exclude()
  @Column()
  @ApiProperty()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
