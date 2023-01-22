import "dotenv/config";
import * as fs from "fs";
import helmet from "helmet";
import * as morgan from "morgan";
import * as passport from "passport";
import { DataSource } from "typeorm";
import * as session from "express-session";
import { AppModule } from "src/app.module";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory, NestApplication } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { GlobalErrorHandler } from "src/utils/all-exception-filter";
import { TypeormStore } from "connect-typeorm/out";
import { SessionEntity } from "./entities/session.entity";

const bootstrap = async () => {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const sessionRepository = await new DataSource({
    type: "mysql",
    username: "root",
    password: process.env.LOCAL_DATABASE_PASSWORD,
    database: "nestjstest",
    entities: [SessionEntity],
  }).initialize();

  const greg = sessionRepository.getRepository(SessionEntity);

  app.use(morgan("dev")); //change to combined in production
  app.enableCors({ credentials: true, origin: ["http://localhost:3000"] });
  app.setGlobalPrefix("api/v1");
  app.use(cookieParser("cookies"));
  app.use(compression());
  app.use(helmet());

  app.use(
    session({
      name: "hackathon session id",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 24 * 7, httpOnly: true, sameSite: true },
      store: new TypeormStore({
        name: "default",
        cleanupLimit: 10,
        limitSubquery: false, // If using MariaDB.
        ttl: 60 * 60 * 24 * 7,
      }).connect(greg),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle("NestJs Hackathon Kit")
    .setDescription("NestJs API Starter Hackthon Kit")
    .setVersion("1.0")
    .addBearerAuth()
    .addServer("http://localhost:8989")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);
  fs.writeFileSync("./swagger-documentation.json", JSON.stringify(document));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalErrorHandler());
  await app.listen(8989);
};

bootstrap();
