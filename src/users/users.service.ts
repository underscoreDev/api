import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { USER_REPOSITORY } from "./user.provider";

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private usersRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update({ id }, { ...updateUserDto });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete({ id });
  }
}
