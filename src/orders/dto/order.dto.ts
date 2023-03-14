import { User } from "src/users/entities/user.entity";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { IsArray, IsNotEmpty, IsObject, IsUUID } from "class-validator";

export class CartItem {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  product: Product;
}

export class ShippingInfo {
  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  zipCode: string;
}

export enum OrderStatus {
  placed = "Placed",
  cancelled = "Cancelled",
  confirmed = "Confirmed",
  shipped = "Shipped",
  delivered = "Delivered",
}

export class OrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  shippingInfo: ShippingInfo;

  @ApiProperty({ enum: OrderStatus, default: OrderStatus.placed })
  orderStatus: OrderStatus;

  @ApiProperty()
  total: number;

  @ApiProperty()
  shippingFee: number;

  @ApiProperty()
  grandTotal: number;

  @ApiProperty()
  cartItems: CartItem[];
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject({ context: ShippingInfo })
  shippingInfo: ShippingInfo;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  cartItems: CartItem[];
}

export class UpdateOrderDto extends PartialType<CreateOrderDto>(CreateOrderDto) {}
