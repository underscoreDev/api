import * as crypto from "crypto";
import { JwtService } from "@nestjs/jwt";
import { Email } from "src/utils/email.utils";
import { HttpStatus } from "@nestjs/common/enums";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailDto, ResetPasswordDto } from "src/users/dto/login.dto";
import { User } from "src/users/entities/user.entity";
import { MoreThanOrEqual, Repository } from "typeorm";
import { Injectable, HttpException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";
import { ChangePasswordDto } from "../users/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<StandardResponse<User>> {
    let user = this.usersRepository.create(createUserDto);

    const emailToken = await user.createEmailVErificationCode();

    try {
      await new Email(user).sendEmailVerificationCode(emailToken);
    } catch (error) {
      throw new HttpException(`Couldn't send Email ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    user = await this.usersRepository.save(user);

    return ResponseManager.StandardResponse(
      "Registration Successful",
      "Verification Code Sent to Email",
      user,
    );
  }

  async confirmEmail(token: string): Promise<StandardResponse<User>> {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await this.usersRepository.findOneBy({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpires: MoreThanOrEqual(new Date(Date.now())),
    });

    if (!user) {
      throw new HttpException("Token Invalid or Expired", 401);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpires = null;

    await user.save();

    const jwt = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return ResponseManager.StandardResponse("Successful", "Email Verified", user, jwt);
  }

  async resendEmailVerificationCode({ email }: EmailDto): Promise<StandardResponse<User>> {
    const user = await this.usersRepository.findOneBy({ email, isEmailVerified: false });

    if (!user) {
      throw new HttpException("User doesn't exist or Email already Verified", 404);
    }

    const emailToken = await user.createEmailVErificationCode();

    await user.save();

    try {
      await new Email(user).sendEmailVerificationCode(emailToken);
    } catch (error) {
      throw new HttpException(`Couldn't send Email ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return ResponseManager.StandardResponse("success", "Verification Code ReSent to Email", user);
  }

  async login(user: User): Promise<{ token: string; status: string }> {
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { status: "success", token };
  }

  async forgotPassword({ email }: EmailDto) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException("User not found", 400);
    }

    const resetToken = await user.createPasswordResetToken();

    await user.save();

    try {
      await new Email(user).passwordResetToken(resetToken);
    } catch (error) {
      throw new HttpException(`Couldn't send Email ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return ResponseManager.StandardResponse("success", "Password Reset Token sent to Email", user);
  }

  // RESET PASSWORD
  async resetPassword({ resetToken, password }: ResetPasswordDto) {
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await this.usersRepository.findOneBy({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: MoreThanOrEqual(new Date(Date.now())),
    });

    if (!user) {
      throw new HttpException("User not found or Token expired", 404);
    }

    user.password = password;

    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;

    await user.save();

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return ResponseManager.StandardResponse("success", "Password has been Reset", user, token);
  }

  async changePassword(loggedInUser: User, { oldPassword, newPassword }: ChangePasswordDto) {
    // check if user exists
    const user = await this.usersRepository.findOneBy({
      id: loggedInUser.id,
      email: loggedInUser.email,
    });

    if (!user) {
      throw new HttpException("User not found", 404);
    }

    // check if posted current password is correct
    const validPassword = await User.comparePasswords(oldPassword, user.password);
    // return an error if anything is incorrect
    if (!validPassword) {
      throw new HttpException("Wrong Password", 400);
    }

    // if so, update password
    user.password = newPassword;

    await user.save();

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return ResponseManager.StandardResponse("success", "Password has been Reset", user, token);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });

    if (user && (await User.comparePasswords(password, user.password))) {
      return user;
    }

    return null;
  }
}
