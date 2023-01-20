import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Email } from "./utils/email.utils";
import { HttpStatus } from "@nestjs/common/enums";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Injectable, HttpException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    const emailToken = await user.createEmailVErificationCode();

    try {
      await new Email(user).sendEmailVerificationCode(emailToken);
    } catch (error) {
      throw new HttpException(`Couldn't send Email ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this.usersRepository.save(user);

    return user;
  }

  async login(user: User): Promise<{ token: string; status: string }> {
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { status: "Login Success", token };
  }

  async confirmEmail(user: User) {
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });

    if (user && (await User.comparePasswords(password, user.password))) {
      return user;
    }

    return null;
  }
}
