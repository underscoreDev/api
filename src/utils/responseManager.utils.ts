import { ApiProperty } from "@nestjs/swagger";

export class ResponseManager {
  public static StandardResponse<T>(
    status: string,
    message: string,
    data: T,
    meta?: object | string,
  ): StandardResponse<T> {
    return {
      status,
      message,
      data,
      meta,
    };
  }
}

export class StandardResponse<T = any> {
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  meta?: object | string;
}
