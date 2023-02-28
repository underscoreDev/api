import BaseModel from "src/entities/baseModel.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { Entity, Column, OneToMany, JoinColumn } from "typeorm";

@Entity({ name: "products" })
export class Product extends BaseModel {
  @Column({ nullable: false, default: true })
  new: boolean;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
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

  @Column({ nullable: false, type: "json" })
  imageGallery: JSON;

  @Column({ nullable: false, type: "json" })
  metaData: JSON;

  @Column({ nullable: false, default: 0 })
  averageRating: number;

  @OneToMany(() => Review, (review) => review.product)
  @JoinColumn()
  reviews: Review[];

  //   @Column({ nullable: false })
  //   Brand: Brand;

  //   @Column({ nullable: false })
  //   category: Category;

  //   @Column({ nullable: false })
  //   subCategory: SubCategory;
}
