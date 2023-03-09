import { Entity, Column, ManyToOne } from "typeorm";
import BaseModel from "src/entities/baseModel.entity";
import { Category } from "src/category/entities/category.entity";

@Entity()
export class SubCategory extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Category, (category: Category) => category.childrenCategories)
  parentCategory: Category;
}
