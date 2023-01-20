import { MoreThanOrEqual, Raw, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Email } from "./utils/email.utils";
import { HttpStatus } from "@nestjs/common/enums";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Injectable, HttpException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ResponseManager, StandardResponse } from "./utils/responseManager.utils";
import * as crypto from "crypto";
import { format } from "date-fns";

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

  async login(user: User): Promise<{ token: string; status: string }> {
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { status: "Login Success", token };
  }

  async confirmEmail(token: string): Promise<StandardResponse<User>> {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await this.usersRepository.findOneByOrFail({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpires: MoreThanOrEqual(new Date(Date.now())),
    });
    console.log("user found");

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpires = null;

    await user.save();

    return ResponseManager.StandardResponse("Successful", "Email Verified", user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });

    if (user && (await User.comparePasswords(password, user.password))) {
      return user;
    }

    return null;
  }
}
