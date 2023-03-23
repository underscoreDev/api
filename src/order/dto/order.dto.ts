import { UserDto } from "src/users/dto/user.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsUUID, IsNotEmptyObject, IsNumber } from "class-validator";

export class CartItem {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: string;
}

export class CreateCartItem {
  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsUUID()
  productId: string;
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
  user: UserDto;

  @ApiProperty({ example: ShippingInfo })
  shippingInfo: ShippingInfo;

  @ApiProperty({ enum: OrderStatus, default: OrderStatus.placed })
  orderStatus: OrderStatus;

  @ApiProperty()
  total: number;

  @ApiProperty()
  shippingFee: number;

  @ApiProperty()
  grandTotal: number;

  @ApiProperty({ example: [CartItem] })
  cartItems: CartItem[];
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmptyObject()
  shippingInfo: ShippingInfo;

  @ApiProperty({ example: [CartItem] })
  @IsArray({ context: CartItem })
  cartItems: CartItem[];
}

export class UpdateOrderDto extends PartialType<CreateOrderDto>(CreateOrderDto) {}
