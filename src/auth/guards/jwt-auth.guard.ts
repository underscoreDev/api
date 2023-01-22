import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

console.log("using jwt guard");
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
