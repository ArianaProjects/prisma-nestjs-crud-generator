import { Global, Module } from "@nestjs/common";
import { BaxService } from "./bax.service";
import { BaxController } from "./bax.controller";

@Module({
  import: [],
  providers: [],
  controllers: [BaxController],
  exports: [BaxService],
})
export class BaxModule {}
