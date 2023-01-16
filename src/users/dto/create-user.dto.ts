import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Match } from "../decorators/match.decorator";
import { IsEmailAlreadyExist } from "../decorators/email.decorator";
import { IsPhoneNumberAlreadyExist } from "../decorators/phoneNumber.decorator";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  @IsEmailAlreadyExist({
    message: "This Email: $value already exists. Please Enter another Email.",
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumberAlreadyExist({
    message: "This Phone Number: $value already exists. Please Enter another Phone Number.",
  })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 24)
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 24)
  @Match("password")
  passwordConfirm: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
  phoneNumber: string;
}

/** TODO
 * Serialized user (Returning the user without the password)
 * custom validator for validating the password and password confirm field --- done
 * custom validator for validating the phone number field --- done
 * custom validator for validating the email number field --- done
 */
