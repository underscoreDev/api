import BaseModel from "src/entities/baseModel.entity";
import { Brand } from "src/brand/entities/brand.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { Category } from "src/category/entities/category.entity";
import { SubCategory } from "src/subCategory/entities/subCategory.entity";
import { Entity, Column, OneToMany, ManyToOne, BeforeInsert } from "typeorm";

@Entity()
export class Product extends BaseModel {
  @Column({ nullable: false, default: true })
  new: boolean;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @Column({ nullable: true, type: "text" })
  features: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: true })
  inStock: boolean;

  @Column({ nullable: true })
  quantityInStock: number;

  @Column({ nullable: false })
  coverImage: string;

  @Column({ nullable: false, type: "jsonb" })
  imageGallery: JSON;

  @Column({ nullable: false, type: "jsonb" })
  metaData: JSON;

  @Column({ nullable: false, default: 0 })
  averageRating: number;

  @Column({ nullable: false, default: 0 })
  noOfRatings: number;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => Brand, { nullable: true, eager: true })
  brand: Brand;

  @ManyToOne(() => Category, { nullable: true, eager: true })
  category: Category;

  @ManyToOne(() => SubCategory, { nullable: true, eager: true })
  subCategory: SubCategory;

  @BeforeInsert()
  createProductSlug() {
    this.slug = this.name.toLowerCase().split(" ").join("-");
  }
}
