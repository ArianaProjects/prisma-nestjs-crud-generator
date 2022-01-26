import { Bax } from "./bax.entity";
import {
  FindBaxDto,
  CreateBaxDto,
  UpdateBaxDto,
  ConnectBaxDto,
} from "./bax.dto";
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
import { BaxService } from "./bax.service";

const apiTag = "Bax";
@Controller("bax")
@ApiBearerAuth()
@ApiTags(apiTag)
export class BaxController {
  constructor(private baxService: BaxService) {}

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
  @ApiQuery({ type: [FindBaxDto] })
  async exist(@Query() query: FindBaxDto): Promise<Boolean> {
    return await this.baxService.exist(query);
  }

  /********************************************************************
   *                            findUniq
   ********************************************************************/

  @Get(":id")
  @ApiOperation({ summary: "Api for findUniq" })
  @ApiResponse({ status: HttpStatus.OK, description: "DESCSTATUS", type: Bax })
  @ApiParam({ type: [ConnectBaxDto] })
  async findUniq(@Param() param: ConnectBaxDto): Promise<Bax> {
    return await this.baxService.findUniq(param);
  }

  /********************************************************************
   *                            findMany
   ********************************************************************/

  @Get("")
  @ApiOperation({ summary: "Api for findMany" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Bax],
  })
  @ApiQuery({ type: [Bax] })
  async findMany(@Query() query: Bax): Promise<Bax[]> {
    return await this.baxService.findMany(query);
  }

  /********************************************************************
   *                            getAll
   ********************************************************************/

  @Get("all")
  @ApiOperation({ summary: "Api for getAll" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Bax],
  })
  async getAll(): Promise<Bax[]> {
    return await this.baxService.getAll();
  }

  /********************************************************************
   *                            createOne
   ********************************************************************/

  @Post("")
  @ApiOperation({ summary: "Api for createOne" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: Bax,
  })
  @ApiBody({ type: [CreateBaxDto] })
  async createOne(@Body() body: CreateBaxDto): Promise<Bax> {
    return await this.baxService.createOne(body);
  }

  /********************************************************************
   *                            createMany
   ********************************************************************/

  @Post("many")
  @ApiOperation({ summary: "Api for createMany" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: [Bax],
  })
  @ApiBody({ type: [CreateBaxDto] })
  async createMany(@Body() body: CreateBaxDto): Promise<Bax[]> {
    return await this.baxService.createMany(body);
  }

  /********************************************************************
   *                            updateOne
   ********************************************************************/

  @Patch(":id")
  @ApiOperation({ summary: "Api for updateOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateBaxDto] })
  @ApiParam({ type: [ConnectBaxDto] })
  async updateOne(
    @Body() body: UpdateBaxDto,
    @Param() param: ConnectBaxDto
  ): Promise<void> {
    await this.baxService.updateOne(body, param);
  }

  /********************************************************************
   *                            updateMany
   ********************************************************************/

  @Patch("many/:id")
  @ApiOperation({ summary: "Api for updateMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateBaxDto] })
  @ApiParam({ type: [ConnectBaxDto] })
  async updateMany(
    @Body() body: UpdateBaxDto,
    @Param() param: ConnectBaxDto
  ): Promise<void> {
    await this.baxService.updateMany(body, param);
  }

  /********************************************************************
   *                            updateAll
   ********************************************************************/

  @Patch("all")
  @ApiOperation({ summary: "Api for updateAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateBaxDto] })
  async updateAll(@Body() body: UpdateBaxDto): Promise<void> {
    await this.baxService.updateAll(body);
  }

  /********************************************************************
   *                            updateAdminOne
   ********************************************************************/

  @Put(":id")
  @ApiOperation({ summary: "Api for updateAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateBaxDto] })
  @ApiParam({ type: [ConnectBaxDto] })
  async updateAdminOne(
    @Body() body: UpdateBaxDto,
    @Param() param: ConnectBaxDto
  ): Promise<void> {
    await this.baxService.updateAdminOne(body, param);
  }

  /********************************************************************
   *                            updateAdminMany
   ********************************************************************/

  @Put("many/:id")
  @ApiOperation({ summary: "Api for updateAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateBaxDto] })
  @ApiParam({ type: [ConnectBaxDto] })
  async updateAdminMany(
    @Body() body: UpdateBaxDto,
    @Param() param: ConnectBaxDto
  ): Promise<void> {
    await this.baxService.updateAdminMany(body, param);
  }

  /********************************************************************
   *                            updateAdminAll
   ********************************************************************/

  @Put("all")
  @ApiOperation({ summary: "Api for updateAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateBaxDto] })
  async updateAdminAll(@Body() body: UpdateBaxDto): Promise<void> {
    await this.baxService.updateAdminAll(body);
  }

  /********************************************************************
   *                            deleteOne
   ********************************************************************/

  @Delete(":id")
  @ApiOperation({ summary: "Api for deleteOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectBaxDto] })
  async deleteOne(@Param() param: ConnectBaxDto): Promise<void> {
    await this.baxService.deleteOne(param);
  }

  /********************************************************************
   *                            deleteMany
   ********************************************************************/

  @Delete("many/:id")
  @ApiOperation({ summary: "Api for deleteMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectBaxDto] })
  async deleteMany(@Param() param: ConnectBaxDto): Promise<void> {
    await this.baxService.deleteMany(param);
  }

  /********************************************************************
   *                            deleteAll
   ********************************************************************/

  @Delete("all")
  @ApiOperation({ summary: "Api for deleteAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAll(): Promise<void> {
    await this.baxService.deleteAll();
  }

  /********************************************************************
   *                            deleteAdminOne
   ********************************************************************/

  @Delete("admin/:id")
  @ApiOperation({ summary: "Api for deleteAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectBaxDto] })
  async deleteAdminOne(@Param() param: ConnectBaxDto): Promise<void> {
    await this.baxService.deleteAdminOne(param);
  }

  /********************************************************************
   *                            deleteAdminMany
   ********************************************************************/

  @Delete("admin/many/:id")
  @ApiOperation({ summary: "Api for deleteAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectBaxDto] })
  async deleteAdminMany(@Param() param: ConnectBaxDto): Promise<void> {
    await this.baxService.deleteAdminMany(param);
  }

  /********************************************************************
   *                            deleteAdminAll
   ********************************************************************/

  @Delete("admin/all")
  @ApiOperation({ summary: "Api for deleteAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAdminAll(): Promise<void> {
    await this.baxService.deleteAdminAll();
  }
}
