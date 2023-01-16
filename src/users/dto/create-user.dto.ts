import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

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
  @Length(6, 24)
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 24)
  passwordConfirm: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
  phoneNumber: string;
}

/** TODO
 * Serialized user (Returning the user without the password)
 * custom validator for validating the password and password confirm field
 * custom validator for validating the phone number field
 * custom validator for validating the email number field
 */
