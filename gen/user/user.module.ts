import { Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  import: [],
  providers: [],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
