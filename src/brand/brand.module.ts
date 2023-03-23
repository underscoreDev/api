import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandService } from "src/brand/brand.service";
import { Brand } from "src/brand/entities/brand.entity";
import { BrandController } from "src/brand/brand.controller";

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [TypeOrmModule.forFeature([Brand])],
})
export class BrandModule {}
