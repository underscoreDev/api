import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Validate } from "class-validator";

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

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  @Validate(
    () => {
      const user = this as CreateUserDto;
      console.log(user);
      return user.password === user.passwordConfirm;
    },
    { message: "Passwords do not match" },
  )
  passwordConfirm: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
  phoneNumber: string;
}
