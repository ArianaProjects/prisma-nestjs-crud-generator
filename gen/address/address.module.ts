import { Global, Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";

@Module({
  import: [],
  providers: [],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {}
