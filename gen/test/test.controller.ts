import { Test } from "./test.entity";
import {
  FindTestDto,
  CreateTestDto,
  UpdateTestDto,
  ConnectTestDto,
} from "./test.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  NotFoundException,
  Param,
  Post,
  Patch,
  Put,
  Req,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { TestService } from "./test.service";

const apiTag = "Test";
@Controller("test")
@ApiBearerAuth()
@ApiTags(apiTag)
export class TestController {
  constructor(private testService: TestService) {}

  /********************************************************************
   *                            exist
   ********************************************************************/

  @Get("exist")
  @ApiOperation({ summary: "Api for exist" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: Boolean,
  })
  @ApiQuery({ type: [FindTestDto] })
  async exist(@Query() query: FindTestDto): Promise<Boolean> {
    return await this.testService.exist(query);
  }

  /********************************************************************
   *                            findUniq
   ********************************************************************/

  @Get(":id")
  @ApiOperation({ summary: "Api for findUniq" })
  @ApiResponse({ status: HttpStatus.OK, description: "DESCSTATUS", type: Test })
  @ApiParam({ type: [ConnectTestDto] })
  async findUniq(@Param() param: ConnectTestDto): Promise<Test> {
    return await this.testService.findUniq(param);
  }

  /********************************************************************
   *                            findMany
   ********************************************************************/

  @Get("")
  @ApiOperation({ summary: "Api for findMany" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Test],
  })
  @ApiQuery({ type: [Test] })
  async findMany(@Query() query: Test): Promise<Test[]> {
    return await this.testService.findMany(query);
  }

  /********************************************************************
   *                            getAll
   ********************************************************************/

  @Get("all")
  @ApiOperation({ summary: "Api for getAll" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Test],
  })
  async getAll(): Promise<Test[]> {
    return await this.testService.getAll();
  }

  /********************************************************************
   *                            createOne
   ********************************************************************/

  @Post("")
  @ApiOperation({ summary: "Api for createOne" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: Test,
  })
  @ApiBody({ type: [CreateTestDto] })
  async createOne(@Body() body: CreateTestDto): Promise<Test> {
    return await this.testService.createOne(body);
  }

  /********************************************************************
   *                            createMany
   ********************************************************************/

  @Post("many")
  @ApiOperation({ summary: "Api for createMany" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: [Test],
  })
  @ApiBody({ type: [CreateTestDto] })
  async createMany(@Body() body: CreateTestDto): Promise<Test[]> {
    return await this.testService.createMany(body);
  }

  /********************************************************************
   *                            updateOne
   ********************************************************************/

  @Patch(":id")
  @ApiOperation({ summary: "Api for updateOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTestDto] })
  @ApiParam({ type: [ConnectTestDto] })
  async updateOne(
    @Body() body: UpdateTestDto,
    @Param() param: ConnectTestDto
  ): Promise<void> {
    await this.testService.updateOne(body, param);
  }

  /********************************************************************
   *                            updateMany
   ********************************************************************/

  @Patch("many/:id")
  @ApiOperation({ summary: "Api for updateMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTestDto] })
  @ApiParam({ type: [ConnectTestDto] })
  async updateMany(
    @Body() body: UpdateTestDto,
    @Param() param: ConnectTestDto
  ): Promise<void> {
    await this.testService.updateMany(body, param);
  }

  /********************************************************************
   *                            updateAll
   ********************************************************************/

  @Patch("all")
  @ApiOperation({ summary: "Api for updateAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTestDto] })
  async updateAll(@Body() body: UpdateTestDto): Promise<void> {
    await this.testService.updateAll(body);
  }

  /********************************************************************
   *                            updateAdminOne
   ********************************************************************/

  @Put(":id")
  @ApiOperation({ summary: "Api for updateAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTestDto] })
  @ApiParam({ type: [ConnectTestDto] })
  async updateAdminOne(
    @Body() body: UpdateTestDto,
    @Param() param: ConnectTestDto
  ): Promise<void> {
    await this.testService.updateAdminOne(body, param);
  }

  /********************************************************************
   *                            updateAdminMany
   ********************************************************************/

  @Put("many/:id")
  @ApiOperation({ summary: "Api for updateAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTestDto] })
  @ApiParam({ type: [ConnectTestDto] })
  async updateAdminMany(
    @Body() body: UpdateTestDto,
    @Param() param: ConnectTestDto
  ): Promise<void> {
    await this.testService.updateAdminMany(body, param);
  }

  /********************************************************************
   *                            updateAdminAll
   ********************************************************************/

  @Put("all")
  @ApiOperation({ summary: "Api for updateAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTestDto] })
  async updateAdminAll(@Body() body: UpdateTestDto): Promise<void> {
    await this.testService.updateAdminAll(body);
  }

  /********************************************************************
   *                            deleteOne
   ********************************************************************/

  @Delete(":id")
  @ApiOperation({ summary: "Api for deleteOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTestDto] })
  async deleteOne(@Param() param: ConnectTestDto): Promise<void> {
    await this.testService.deleteOne(param);
  }

  /********************************************************************
   *                            deleteMany
   ********************************************************************/

  @Delete("many/:id")
  @ApiOperation({ summary: "Api for deleteMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTestDto] })
  async deleteMany(@Param() param: ConnectTestDto): Promise<void> {
    await this.testService.deleteMany(param);
  }

  /********************************************************************
   *                            deleteAll
   ********************************************************************/

  @Delete("all")
  @ApiOperation({ summary: "Api for deleteAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAll(): Promise<void> {
    await this.testService.deleteAll();
  }

  /********************************************************************
   *                            deleteAdminOne
   ********************************************************************/

  @Delete("admin/:id")
  @ApiOperation({ summary: "Api for deleteAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTestDto] })
  async deleteAdminOne(@Param() param: ConnectTestDto): Promise<void> {
    await this.testService.deleteAdminOne(param);
  }

  /********************************************************************
   *                            deleteAdminMany
   ********************************************************************/

  @Delete("admin/many/:id")
  @ApiOperation({ summary: "Api for deleteAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTestDto] })
  async deleteAdminMany(@Param() param: ConnectTestDto): Promise<void> {
    await this.testService.deleteAdminMany(param);
  }

  /********************************************************************
   *                            deleteAdminAll
   ********************************************************************/

  @Delete("admin/all")
  @ApiOperation({ summary: "Api for deleteAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAdminAll(): Promise<void> {
    await this.testService.deleteAdminAll();
  }
}
