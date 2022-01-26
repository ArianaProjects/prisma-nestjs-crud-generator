import { Global, Module } from "@nestjs/common";
import { AxService } from "./ax.service";
import { AxController } from "./ax.controller";

@Module({
  import: [],
  providers: [],
  controllers: [AxController],
  exports: [AxService],
})
export class AxModule {}
