import BaseModel from "src/entities/baseModel.entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { Category } from "src/product/entities/category.entity";

@Entity({ name: "subCategories" })
export class SubCategory extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Category, { nullable: false, cascade: true, eager: true })
  parentCategory: Category;
}
