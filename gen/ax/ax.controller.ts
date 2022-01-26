import { Ax } from "./ax.entity";
import { FindAxDto, CreateAxDto, UpdateAxDto, ConnectAxDto } from "./ax.dto";
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
import { AxService } from "./ax.service";

const apiTag = "Ax";
@Controller("ax")
@ApiBearerAuth()
@ApiTags(apiTag)
export class AxController {
  constructor(private axService: AxService) {}

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
  @ApiQuery({ type: [FindAxDto] })
  async exist(@Query() query: FindAxDto): Promise<Boolean> {
    return await this.axService.exist(query);
  }

  /********************************************************************
   *                            findUniq
   ********************************************************************/

  @Get(":id")
  @ApiOperation({ summary: "Api for findUniq" })
  @ApiResponse({ status: HttpStatus.OK, description: "DESCSTATUS", type: Ax })
  @ApiParam({ type: [ConnectAxDto] })
  async findUniq(@Param() param: ConnectAxDto): Promise<Ax> {
    return await this.axService.findUniq(param);
  }

  /********************************************************************
   *                            findMany
   ********************************************************************/

  @Get("")
  @ApiOperation({ summary: "Api for findMany" })
  @ApiResponse({ status: HttpStatus.OK, description: "DESCSTATUS", type: [Ax] })
  @ApiQuery({ type: [Ax] })
  async findMany(@Query() query: Ax): Promise<Ax[]> {
    return await this.axService.findMany(query);
  }

  /********************************************************************
   *                            getAll
   ********************************************************************/

  @Get("all")
  @ApiOperation({ summary: "Api for getAll" })
  @ApiResponse({ status: HttpStatus.OK, description: "DESCSTATUS", type: [Ax] })
  async getAll(): Promise<Ax[]> {
    return await this.axService.getAll();
  }

  /********************************************************************
   *                            createOne
   ********************************************************************/

  @Post("")
  @ApiOperation({ summary: "Api for createOne" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: Ax,
  })
  @ApiBody({ type: [CreateAxDto] })
  async createOne(@Body() body: CreateAxDto): Promise<Ax> {
    return await this.axService.createOne(body);
  }

  /********************************************************************
   *                            createMany
   ********************************************************************/

  @Post("many")
  @ApiOperation({ summary: "Api for createMany" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: [Ax],
  })
  @ApiBody({ type: [CreateAxDto] })
  async createMany(@Body() body: CreateAxDto): Promise<Ax[]> {
    return await this.axService.createMany(body);
  }

  /********************************************************************
   *                            updateOne
   ********************************************************************/

  @Patch(":id")
  @ApiOperation({ summary: "Api for updateOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAxDto] })
  @ApiParam({ type: [ConnectAxDto] })
  async updateOne(
    @Body() body: UpdateAxDto,
    @Param() param: ConnectAxDto
  ): Promise<void> {
    await this.axService.updateOne(body, param);
  }

  /********************************************************************
   *                            updateMany
   ********************************************************************/

  @Patch("many/:id")
  @ApiOperation({ summary: "Api for updateMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAxDto] })
  @ApiParam({ type: [ConnectAxDto] })
  async updateMany(
    @Body() body: UpdateAxDto,
    @Param() param: ConnectAxDto
  ): Promise<void> {
    await this.axService.updateMany(body, param);
  }

  /********************************************************************
   *                            updateAll
   ********************************************************************/

  @Patch("all")
  @ApiOperation({ summary: "Api for updateAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAxDto] })
  async updateAll(@Body() body: UpdateAxDto): Promise<void> {
    await this.axService.updateAll(body);
  }

  /********************************************************************
   *                            updateAdminOne
   ********************************************************************/

  @Put(":id")
  @ApiOperation({ summary: "Api for updateAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAxDto] })
  @ApiParam({ type: [ConnectAxDto] })
  async updateAdminOne(
    @Body() body: UpdateAxDto,
    @Param() param: ConnectAxDto
  ): Promise<void> {
    await this.axService.updateAdminOne(body, param);
  }

  /********************************************************************
   *                            updateAdminMany
   ********************************************************************/

  @Put("many/:id")
  @ApiOperation({ summary: "Api for updateAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAxDto] })
  @ApiParam({ type: [ConnectAxDto] })
  async updateAdminMany(
    @Body() body: UpdateAxDto,
    @Param() param: ConnectAxDto
  ): Promise<void> {
    await this.axService.updateAdminMany(body, param);
  }

  /********************************************************************
   *                            updateAdminAll
   ********************************************************************/

  @Put("all")
  @ApiOperation({ summary: "Api for updateAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAxDto] })
  async updateAdminAll(@Body() body: UpdateAxDto): Promise<void> {
    await this.axService.updateAdminAll(body);
  }

  /********************************************************************
   *                            deleteOne
   ********************************************************************/

  @Delete(":id")
  @ApiOperation({ summary: "Api for deleteOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAxDto] })
  async deleteOne(@Param() param: ConnectAxDto): Promise<void> {
    await this.axService.deleteOne(param);
  }

  /********************************************************************
   *                            deleteMany
   ********************************************************************/

  @Delete("many/:id")
  @ApiOperation({ summary: "Api for deleteMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAxDto] })
  async deleteMany(@Param() param: ConnectAxDto): Promise<void> {
    await this.axService.deleteMany(param);
  }

  /********************************************************************
   *                            deleteAll
   ********************************************************************/

  @Delete("all")
  @ApiOperation({ summary: "Api for deleteAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAll(): Promise<void> {
    await this.axService.deleteAll();
  }

  /********************************************************************
   *                            deleteAdminOne
   ********************************************************************/

  @Delete("admin/:id")
  @ApiOperation({ summary: "Api for deleteAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAxDto] })
  async deleteAdminOne(@Param() param: ConnectAxDto): Promise<void> {
    await this.axService.deleteAdminOne(param);
  }

  /********************************************************************
   *                            deleteAdminMany
   ********************************************************************/

  @Delete("admin/many/:id")
  @ApiOperation({ summary: "Api for deleteAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAxDto] })
  async deleteAdminMany(@Param() param: ConnectAxDto): Promise<void> {
    await this.axService.deleteAdminMany(param);
  }

  /********************************************************************
   *                            deleteAdminAll
   ********************************************************************/

  @Delete("admin/all")
  @ApiOperation({ summary: "Api for deleteAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAdminAll(): Promise<void> {
    await this.axService.deleteAdminAll();
  }
}
