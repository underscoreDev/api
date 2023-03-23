import { Entity, Column } from "typeorm";
import BaseModel from "src/entities/baseModel.entity";

@Entity()
export class Brand extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;
}
