import { User } from "src/users/entities/user.entity";

export const USER_REPOSITORY = "USER_REPOSITORY";

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
