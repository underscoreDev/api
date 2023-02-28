import { Entity, Column } from "typeorm";
import BaseModel from "src/entities/baseModel.entity";

@Entity({ name: "brands" })
export class Brand extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;
}
