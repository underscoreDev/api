import { User } from "src/users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "src/product/dto/product.dto";

export class OrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  address: JSON;

  @ApiProperty()
  total: number;

  @ApiProperty()
  shippingFee: number;

  @ApiProperty()
  grandTotal: number;

  @ApiProperty()
  products: ProductDto[];

  @ApiProperty()
  user: User;
}

export class CreateOrderDto {
  @ApiProperty()
  address: JSON;

  @ApiProperty()
  products: ProductDto[];

  @ApiProperty()
  userId: string;
}
