import { Global, Module } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";

@Module({
  import: [],
  providers: [],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
