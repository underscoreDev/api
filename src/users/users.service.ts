import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

const customers: CreateUserDto[] = [
  { id: 1, email: "greg@greg.com", name: "greg" },
  { id: 2, email: "bobo@bobo.com", name: "greg" },
  { id: 3, email: "esther@esther.com", name: "esther" },
  { id: 4, email: "favour@favour.com", name: "greg" },
];

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return customers.push(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  findOne(id: number) {
    return customers.find((cus) => cus.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return customers.filter((cus) => cus.id !== id);
  }
}
