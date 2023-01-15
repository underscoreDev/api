import * as fs from "fs";
import { AppModule } from "src/app.module";
import { NestFactory, NestApplication } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const bootstrap = async () => {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.enableCors();
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle("NestJs Hackathon Kit")
    .setDescription("NestJs API Starter Hackthon Kit")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);
  fs.writeFileSync("./swagger-documentation.json", JSON.stringify(document));

  await app.listen(8989);
};

bootstrap();
