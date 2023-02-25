import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { SessionEntity } from "src/entities/session.entity";
import { Review } from "src/reviews/entities/reviews.entity";

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: process.env.LOCAL_DATABASE_PASSWORD,
        database: "nestjstest",
        entities: [User, Review, SessionEntity],
        synchronize: true,
        logging: false,
      });
      const connect = await dataSource.initialize();
      return connect;
    },
  },
];
