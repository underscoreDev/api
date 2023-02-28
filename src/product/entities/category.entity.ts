import BaseModel from "src/entities/baseModel.entity";
import { Entity, Column, OneToMany } from "typeorm";
import { SubCategory } from "./subCategory.entity";

@Entity({ name: "categories" })
export class Category extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.parentCategory, { eager: true })
  subCategories: SubCategory[];
}
