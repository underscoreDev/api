import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import BaseModel from "src/utils/model.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Review } from "src/reviews/entities/reviews.entity";

@Entity({ name: "users" })
export class User extends BaseModel {
  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  phoneNumber: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ default: false })
  @ApiProperty()
  isEmailVerified: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
