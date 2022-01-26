import { Tax } from "./tax.entity";
import {
  FindTaxDto,
  CreateTaxDto,
  UpdateTaxDto,
  ConnectTaxDto,
} from "./tax.dto";
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
import { TaxService } from "./tax.service";

const apiTag = "Tax";
@Controller("tax")
@ApiBearerAuth()
@ApiTags(apiTag)
export class TaxController {
  constructor(private taxService: TaxService) {}

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
  @ApiQuery({ type: [FindTaxDto] })
  async exist(@Query() query: FindTaxDto): Promise<Boolean> {
    return await this.taxService.exist(query);
  }

  /********************************************************************
   *                            findUniq
   ********************************************************************/

  @Get(":id")
  @ApiOperation({ summary: "Api for findUniq" })
  @ApiResponse({ status: HttpStatus.OK, description: "DESCSTATUS", type: Tax })
  @ApiParam({ type: [ConnectTaxDto] })
  async findUniq(@Param() param: ConnectTaxDto): Promise<Tax> {
    return await this.taxService.findUniq(param);
  }

  /********************************************************************
   *                            findMany
   ********************************************************************/

  @Get("")
  @ApiOperation({ summary: "Api for findMany" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Tax],
  })
  @ApiQuery({ type: [Tax] })
  async findMany(@Query() query: Tax): Promise<Tax[]> {
    return await this.taxService.findMany(query);
  }

  /********************************************************************
   *                            getAll
   ********************************************************************/

  @Get("all")
  @ApiOperation({ summary: "Api for getAll" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Tax],
  })
  async getAll(): Promise<Tax[]> {
    return await this.taxService.getAll();
  }

  /********************************************************************
   *                            createOne
   ********************************************************************/

  @Post("")
  @ApiOperation({ summary: "Api for createOne" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: Tax,
  })
  @ApiBody({ type: [CreateTaxDto] })
  async createOne(@Body() body: CreateTaxDto): Promise<Tax> {
    return await this.taxService.createOne(body);
  }

  /********************************************************************
   *                            createMany
   ********************************************************************/

  @Post("many")
  @ApiOperation({ summary: "Api for createMany" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: [Tax],
  })
  @ApiBody({ type: [CreateTaxDto] })
  async createMany(@Body() body: CreateTaxDto): Promise<Tax[]> {
    return await this.taxService.createMany(body);
  }

  /********************************************************************
   *                            updateOne
   ********************************************************************/

  @Patch(":id")
  @ApiOperation({ summary: "Api for updateOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTaxDto] })
  @ApiParam({ type: [ConnectTaxDto] })
  async updateOne(
    @Body() body: UpdateTaxDto,
    @Param() param: ConnectTaxDto
  ): Promise<void> {
    await this.taxService.updateOne(body, param);
  }

  /********************************************************************
   *                            updateMany
   ********************************************************************/

  @Patch("many/:id")
  @ApiOperation({ summary: "Api for updateMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTaxDto] })
  @ApiParam({ type: [ConnectTaxDto] })
  async updateMany(
    @Body() body: UpdateTaxDto,
    @Param() param: ConnectTaxDto
  ): Promise<void> {
    await this.taxService.updateMany(body, param);
  }

  /********************************************************************
   *                            updateAll
   ********************************************************************/

  @Patch("all")
  @ApiOperation({ summary: "Api for updateAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTaxDto] })
  async updateAll(@Body() body: UpdateTaxDto): Promise<void> {
    await this.taxService.updateAll(body);
  }

  /********************************************************************
   *                            updateAdminOne
   ********************************************************************/

  @Put(":id")
  @ApiOperation({ summary: "Api for updateAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTaxDto] })
  @ApiParam({ type: [ConnectTaxDto] })
  async updateAdminOne(
    @Body() body: UpdateTaxDto,
    @Param() param: ConnectTaxDto
  ): Promise<void> {
    await this.taxService.updateAdminOne(body, param);
  }

  /********************************************************************
   *                            updateAdminMany
   ********************************************************************/

  @Put("many/:id")
  @ApiOperation({ summary: "Api for updateAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTaxDto] })
  @ApiParam({ type: [ConnectTaxDto] })
  async updateAdminMany(
    @Body() body: UpdateTaxDto,
    @Param() param: ConnectTaxDto
  ): Promise<void> {
    await this.taxService.updateAdminMany(body, param);
  }

  /********************************************************************
   *                            updateAdminAll
   ********************************************************************/

  @Put("all")
  @ApiOperation({ summary: "Api for updateAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateTaxDto] })
  async updateAdminAll(@Body() body: UpdateTaxDto): Promise<void> {
    await this.taxService.updateAdminAll(body);
  }

  /********************************************************************
   *                            deleteOne
   ********************************************************************/

  @Delete(":id")
  @ApiOperation({ summary: "Api for deleteOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTaxDto] })
  async deleteOne(@Param() param: ConnectTaxDto): Promise<void> {
    await this.taxService.deleteOne(param);
  }

  /********************************************************************
   *                            deleteMany
   ********************************************************************/

  @Delete("many/:id")
  @ApiOperation({ summary: "Api for deleteMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTaxDto] })
  async deleteMany(@Param() param: ConnectTaxDto): Promise<void> {
    await this.taxService.deleteMany(param);
  }

  /********************************************************************
   *                            deleteAll
   ********************************************************************/

  @Delete("all")
  @ApiOperation({ summary: "Api for deleteAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAll(): Promise<void> {
    await this.taxService.deleteAll();
  }

  /********************************************************************
   *                            deleteAdminOne
   ********************************************************************/

  @Delete("admin/:id")
  @ApiOperation({ summary: "Api for deleteAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTaxDto] })
  async deleteAdminOne(@Param() param: ConnectTaxDto): Promise<void> {
    await this.taxService.deleteAdminOne(param);
  }

  /********************************************************************
   *                            deleteAdminMany
   ********************************************************************/

  @Delete("admin/many/:id")
  @ApiOperation({ summary: "Api for deleteAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectTaxDto] })
  async deleteAdminMany(@Param() param: ConnectTaxDto): Promise<void> {
    await this.taxService.deleteAdminMany(param);
  }

  /********************************************************************
   *                            deleteAdminAll
   ********************************************************************/

  @Delete("admin/all")
  @ApiOperation({ summary: "Api for deleteAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAdminAll(): Promise<void> {
    await this.taxService.deleteAdminAll();
  }
}
