import moment from "moment";
import crypto from "crypto";
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

  @Column()
  @Exclude()
  static emailVerificationToken: string;

  @Column()
  @Exclude()
  static emailVerificationTokenExpires: moment.Moment;

  @Column()
  @Exclude()
  static passwordResetToken: string;

  @Column()
  @Exclude()
  static passwordResetTokenExpires: moment.Moment;

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

  static async createEmailVErificationCode() {
    const verificationToken = crypto.randomBytes(3).toString("hex");

    this.emailVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    this.emailVerificationTokenExpires = moment().add(10, "minutes");

    return verificationToken;
  }

  static async createPasswordResetToken() {
    // create unencrypted reset token
    const resetToken = crypto.randomBytes(3).toString("hex");

    // create and save encrypted reset token to database
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.passwordResetTokenExpires = moment().add(10, "minutes");
    // send the unencrypted reset token to users email
    return resetToken;
  }
}
