import { Global, Module } from "@nestjs/common";
import { TaxService } from "./tax.service";
import { TaxController } from "./tax.controller";

@Module({
  import: [],
  providers: [],
  controllers: [TaxController],
  exports: [TaxService],
})
export class TaxModule {}
