import { addMinutes } from "date-fns";
import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";
import { IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import BaseModel from "src/entities/baseModel.entity";
import { Role } from "src/auth/decorators/role.decorator";
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
  @Exclude()
  password: string;

  @Column({ default: false })
  @ApiProperty()
  isEmailVerified: boolean;

  @Column({ default: Role.User })
  @ApiProperty()
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  emailVerificationToken: string;

  @Column({ nullable: true })
  @Exclude()
  emailVerificationTokenExpires: Date;

  @Column({ nullable: true })
  @Exclude()
  passwordResetToken: string;

  @Column({ nullable: true })
  @Exclude()
  passwordResetTokenExpires: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
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

  async createEmailVErificationCode() {
    const verificationToken = crypto.randomBytes(3).toString("hex");

    this.emailVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    let date = new Date();

    date = addMinutes(date, 10);

    this.emailVerificationTokenExpires = date;

    return verificationToken;
  }

  async createPasswordResetToken() {
    // create unencrypted reset token
    const resetToken = crypto.randomBytes(3).toString("hex");

    // create and save encrypted reset token to database
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    let date = new Date();
    date = addMinutes(date, 10);

    this.passwordResetTokenExpires = date;
    // send the unencrypted reset token to users email
    return resetToken;
  }
}
