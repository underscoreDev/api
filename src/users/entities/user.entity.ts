import * as bcrypt from "bcryptjs";
import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import BaseModel from "src/entities/baseModel.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { Column, Entity, OneToMany, BeforeInsert } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseModel {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column({ unique: true })
  @ApiProperty()
  phoneNumber: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ default: false })
  @ApiProperty()
  isEmailVerified: boolean;

  /**
   * Relationships
   */
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  /**
   * Hooks
   */
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  /**
   *  Compare Password Static Method
   * @param inputedPassword string
   * @param hashedPassword string
   * @returns Promise<boolean>
   */

  static async comparePasswords(inputedPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputedPassword, hashedPassword);
  }
}
