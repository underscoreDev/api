import * as fs from "fs";
import helmet from "helmet";
import * as morgan from "morgan";
import { AppModule } from "src/app.module";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory, NestApplication } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/utils/all-exception-filter";

const bootstrap = async () => {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.use(morgan("dev")); //change to combined in production
  app.enableCors({ credentials: true, origin: ["http://localhost:3000"] });
  app.setGlobalPrefix("api/v1");
  app.use(cookieParser("cookies"));
  app.use(compression());
  app.use(helmet());

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
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8989);
};

bootstrap();
