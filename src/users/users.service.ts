import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ResponseManager, StandardResponse } from "src/utils/responseManager.utils";
import { QueryDto, paginateResponse } from "src/utils/pagination.utils";
import { Guard } from "src/utils/guard.utils";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findAll(query: QueryDto): Promise<StandardResponse<User[]>> {
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (page - 1) * limit;

    const users = await this.usersRepository.findAndCount({ take: limit, skip });

    return ResponseManager.StandardResponse({
      code: 200,
      message: "users fetched successfully",
      ...paginateResponse(users, page, limit),
    });
  }

  async findOne(id: string): Promise<StandardResponse<User>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { reviews: true },
    });

    Guard.AgainstNotFound(user, "user");

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "User retrieved Successfully",
      data: user,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<StandardResponse<User>> {
    const user = await this.usersRepository.findOneBy({ id });

    Guard.AgainstNotFound(user, "user");

    await this.usersRepository.update({ id }, { ...updateUserDto });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 200,
      message: "User Updated Successfully",
      data: user,
    });
  }

  async remove(id: string): Promise<StandardResponse<null>> {
    const user = await this.usersRepository.findOneBy({ id });

    Guard.AgainstNotFound(user, "user");

    await this.usersRepository.delete({ id });

    return ResponseManager.StandardResponse({
      status: "success",
      code: 204,
      message: "User deleted Successfully",
      data: null,
    });
  }
}
