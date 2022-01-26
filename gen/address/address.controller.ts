import { Address } from "./address.entity";
import {
  FindAddressDto,
  CreateAddressDto,
  UpdateAddressDto,
  ConnectAddressDto,
} from "./address.dto";
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
import { AddressService } from "./address.service";

const apiTag = "Address";
@Controller("address")
@ApiBearerAuth()
@ApiTags(apiTag)
export class AddressController {
  constructor(private addressService: AddressService) {}

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
  @ApiQuery({ type: [FindAddressDto] })
  async exist(@Query() query: FindAddressDto): Promise<Boolean> {
    return await this.addressService.exist(query);
  }

  /********************************************************************
   *                            findUniq
   ********************************************************************/

  @Get(":id")
  @ApiOperation({ summary: "Api for findUniq" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: Address,
  })
  @ApiParam({ type: [ConnectAddressDto] })
  async findUniq(@Param() param: ConnectAddressDto): Promise<Address> {
    return await this.addressService.findUniq(param);
  }

  /********************************************************************
   *                            findMany
   ********************************************************************/

  @Get("")
  @ApiOperation({ summary: "Api for findMany" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Address],
  })
  @ApiQuery({ type: [Address] })
  async findMany(@Query() query: Address): Promise<Address[]> {
    return await this.addressService.findMany(query);
  }

  /********************************************************************
   *                            getAll
   ********************************************************************/

  @Get("all")
  @ApiOperation({ summary: "Api for getAll" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [Address],
  })
  async getAll(): Promise<Address[]> {
    return await this.addressService.getAll();
  }

  /********************************************************************
   *                            createOne
   ********************************************************************/

  @Post("")
  @ApiOperation({ summary: "Api for createOne" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: Address,
  })
  @ApiBody({ type: [CreateAddressDto] })
  async createOne(@Body() body: CreateAddressDto): Promise<Address> {
    return await this.addressService.createOne(body);
  }

  /********************************************************************
   *                            createMany
   ********************************************************************/

  @Post("many")
  @ApiOperation({ summary: "Api for createMany" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: [Address],
  })
  @ApiBody({ type: [CreateAddressDto] })
  async createMany(@Body() body: CreateAddressDto): Promise<Address[]> {
    return await this.addressService.createMany(body);
  }

  /********************************************************************
   *                            updateOne
   ********************************************************************/

  @Patch(":id")
  @ApiOperation({ summary: "Api for updateOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAddressDto] })
  @ApiParam({ type: [ConnectAddressDto] })
  async updateOne(
    @Body() body: UpdateAddressDto,
    @Param() param: ConnectAddressDto
  ): Promise<void> {
    await this.addressService.updateOne(body, param);
  }

  /********************************************************************
   *                            updateMany
   ********************************************************************/

  @Patch("many/:id")
  @ApiOperation({ summary: "Api for updateMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAddressDto] })
  @ApiParam({ type: [ConnectAddressDto] })
  async updateMany(
    @Body() body: UpdateAddressDto,
    @Param() param: ConnectAddressDto
  ): Promise<void> {
    await this.addressService.updateMany(body, param);
  }

  /********************************************************************
   *                            updateAll
   ********************************************************************/

  @Patch("all")
  @ApiOperation({ summary: "Api for updateAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAddressDto] })
  async updateAll(@Body() body: UpdateAddressDto): Promise<void> {
    await this.addressService.updateAll(body);
  }

  /********************************************************************
   *                            updateAdminOne
   ********************************************************************/

  @Put(":id")
  @ApiOperation({ summary: "Api for updateAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAddressDto] })
  @ApiParam({ type: [ConnectAddressDto] })
  async updateAdminOne(
    @Body() body: UpdateAddressDto,
    @Param() param: ConnectAddressDto
  ): Promise<void> {
    await this.addressService.updateAdminOne(body, param);
  }

  /********************************************************************
   *                            updateAdminMany
   ********************************************************************/

  @Put("many/:id")
  @ApiOperation({ summary: "Api for updateAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAddressDto] })
  @ApiParam({ type: [ConnectAddressDto] })
  async updateAdminMany(
    @Body() body: UpdateAddressDto,
    @Param() param: ConnectAddressDto
  ): Promise<void> {
    await this.addressService.updateAdminMany(body, param);
  }

  /********************************************************************
   *                            updateAdminAll
   ********************************************************************/

  @Put("all")
  @ApiOperation({ summary: "Api for updateAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateAddressDto] })
  async updateAdminAll(@Body() body: UpdateAddressDto): Promise<void> {
    await this.addressService.updateAdminAll(body);
  }

  /********************************************************************
   *                            deleteOne
   ********************************************************************/

  @Delete(":id")
  @ApiOperation({ summary: "Api for deleteOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAddressDto] })
  async deleteOne(@Param() param: ConnectAddressDto): Promise<void> {
    await this.addressService.deleteOne(param);
  }

  /********************************************************************
   *                            deleteMany
   ********************************************************************/

  @Delete("many/:id")
  @ApiOperation({ summary: "Api for deleteMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAddressDto] })
  async deleteMany(@Param() param: ConnectAddressDto): Promise<void> {
    await this.addressService.deleteMany(param);
  }

  /********************************************************************
   *                            deleteAll
   ********************************************************************/

  @Delete("all")
  @ApiOperation({ summary: "Api for deleteAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAll(): Promise<void> {
    await this.addressService.deleteAll();
  }

  /********************************************************************
   *                            deleteAdminOne
   ********************************************************************/

  @Delete("admin/:id")
  @ApiOperation({ summary: "Api for deleteAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAddressDto] })
  async deleteAdminOne(@Param() param: ConnectAddressDto): Promise<void> {
    await this.addressService.deleteAdminOne(param);
  }

  /********************************************************************
   *                            deleteAdminMany
   ********************************************************************/

  @Delete("admin/many/:id")
  @ApiOperation({ summary: "Api for deleteAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectAddressDto] })
  async deleteAdminMany(@Param() param: ConnectAddressDto): Promise<void> {
    await this.addressService.deleteAdminMany(param);
  }

  /********************************************************************
   *                            deleteAdminAll
   ********************************************************************/

  @Delete("admin/all")
  @ApiOperation({ summary: "Api for deleteAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAdminAll(): Promise<void> {
    await this.addressService.deleteAdminAll();
  }
}
