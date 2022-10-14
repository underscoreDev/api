import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";

const port = process.env.PORT || 8989;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  await app.listen(port);
};

bootstrap();
