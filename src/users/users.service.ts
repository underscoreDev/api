import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

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
