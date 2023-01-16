import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, Length } from "class-validator";
const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({
    description: "The password of the User",
    example: "Password@123",
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_RULE, { message: "Passwords must match" })
  password: string;

  @ApiProperty({
    description: "Confirm the password",
    example: "Password@123",
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_RULE, { message: "Password confirm must match with password" })
  passwordConfirm: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
  phoneNumber: string;
}
