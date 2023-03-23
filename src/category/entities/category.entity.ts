import { Entity, Column, OneToMany } from "typeorm";
import BaseModel from "src/entities/baseModel.entity";
import { SubCategory } from "src/subCategory/entities/subCategory.entity";

@Entity()
export class Category extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.parentCategory)
  childrenCategories: SubCategory[];
}
