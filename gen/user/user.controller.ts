import { User } from "./user.entity";
import {
  FindUserDto,
  CreateUserDto,
  UpdateUserDto,
  ConnectUserDto,
} from "./user.dto";
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
import { UserService } from "./user.service";

const apiTag = "User";
@Controller("user")
@ApiBearerAuth()
@ApiTags(apiTag)
export class UserController {
  constructor(private userService: UserService) {}

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
  @ApiQuery({ type: [FindUserDto] })
  async exist(@Query() query: FindUserDto): Promise<Boolean> {
    return await this.userService.exist(query);
  }

  /********************************************************************
   *                            findUniq
   ********************************************************************/

  @Get(":id")
  @ApiOperation({ summary: "Api for findUniq" })
  @ApiResponse({ status: HttpStatus.OK, description: "DESCSTATUS", type: User })
  @ApiParam({ type: [ConnectUserDto] })
  async findUniq(@Param() param: ConnectUserDto): Promise<User> {
    return await this.userService.findUniq(param);
  }

  /********************************************************************
   *                            findMany
   ********************************************************************/

  @Get("")
  @ApiOperation({ summary: "Api for findMany" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [User],
  })
  @ApiQuery({ type: [User] })
  async findMany(@Query() query: User): Promise<User[]> {
    return await this.userService.findMany(query);
  }

  /********************************************************************
   *                            getAll
   ********************************************************************/

  @Get("all")
  @ApiOperation({ summary: "Api for getAll" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "DESCSTATUS",
    type: [User],
  })
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  /********************************************************************
   *                            createOne
   ********************************************************************/

  @Post("")
  @ApiOperation({ summary: "Api for createOne" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: User,
  })
  @ApiBody({ type: [CreateUserDto] })
  async createOne(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createOne(body);
  }

  /********************************************************************
   *                            createMany
   ********************************************************************/

  @Post("many")
  @ApiOperation({ summary: "Api for createMany" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "DESCSTATUS",
    type: [User],
  })
  @ApiBody({ type: [CreateUserDto] })
  async createMany(@Body() body: CreateUserDto): Promise<User[]> {
    return await this.userService.createMany(body);
  }

  /********************************************************************
   *                            updateOne
   ********************************************************************/

  @Patch(":id")
  @ApiOperation({ summary: "Api for updateOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateUserDto] })
  @ApiParam({ type: [ConnectUserDto] })
  async updateOne(
    @Body() body: UpdateUserDto,
    @Param() param: ConnectUserDto
  ): Promise<void> {
    await this.userService.updateOne(body, param);
  }

  /********************************************************************
   *                            updateMany
   ********************************************************************/

  @Patch("many/:id")
  @ApiOperation({ summary: "Api for updateMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateUserDto] })
  @ApiParam({ type: [ConnectUserDto] })
  async updateMany(
    @Body() body: UpdateUserDto,
    @Param() param: ConnectUserDto
  ): Promise<void> {
    await this.userService.updateMany(body, param);
  }

  /********************************************************************
   *                            updateAll
   ********************************************************************/

  @Patch("all")
  @ApiOperation({ summary: "Api for updateAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateUserDto] })
  async updateAll(@Body() body: UpdateUserDto): Promise<void> {
    await this.userService.updateAll(body);
  }

  /********************************************************************
   *                            updateAdminOne
   ********************************************************************/

  @Put(":id")
  @ApiOperation({ summary: "Api for updateAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateUserDto] })
  @ApiParam({ type: [ConnectUserDto] })
  async updateAdminOne(
    @Body() body: UpdateUserDto,
    @Param() param: ConnectUserDto
  ): Promise<void> {
    await this.userService.updateAdminOne(body, param);
  }

  /********************************************************************
   *                            updateAdminMany
   ********************************************************************/

  @Put("many/:id")
  @ApiOperation({ summary: "Api for updateAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateUserDto] })
  @ApiParam({ type: [ConnectUserDto] })
  async updateAdminMany(
    @Body() body: UpdateUserDto,
    @Param() param: ConnectUserDto
  ): Promise<void> {
    await this.userService.updateAdminMany(body, param);
  }

  /********************************************************************
   *                            updateAdminAll
   ********************************************************************/

  @Put("all")
  @ApiOperation({ summary: "Api for updateAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiBody({ type: [UpdateUserDto] })
  async updateAdminAll(@Body() body: UpdateUserDto): Promise<void> {
    await this.userService.updateAdminAll(body);
  }

  /********************************************************************
   *                            deleteOne
   ********************************************************************/

  @Delete(":id")
  @ApiOperation({ summary: "Api for deleteOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectUserDto] })
  async deleteOne(@Param() param: ConnectUserDto): Promise<void> {
    await this.userService.deleteOne(param);
  }

  /********************************************************************
   *                            deleteMany
   ********************************************************************/

  @Delete("many/:id")
  @ApiOperation({ summary: "Api for deleteMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectUserDto] })
  async deleteMany(@Param() param: ConnectUserDto): Promise<void> {
    await this.userService.deleteMany(param);
  }

  /********************************************************************
   *                            deleteAll
   ********************************************************************/

  @Delete("all")
  @ApiOperation({ summary: "Api for deleteAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAll(): Promise<void> {
    await this.userService.deleteAll();
  }

  /********************************************************************
   *                            deleteAdminOne
   ********************************************************************/

  @Delete("admin/:id")
  @ApiOperation({ summary: "Api for deleteAdminOne" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectUserDto] })
  async deleteAdminOne(@Param() param: ConnectUserDto): Promise<void> {
    await this.userService.deleteAdminOne(param);
  }

  /********************************************************************
   *                            deleteAdminMany
   ********************************************************************/

  @Delete("admin/many/:id")
  @ApiOperation({ summary: "Api for deleteAdminMany" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  @ApiParam({ type: [ConnectUserDto] })
  async deleteAdminMany(@Param() param: ConnectUserDto): Promise<void> {
    await this.userService.deleteAdminMany(param);
  }

  /********************************************************************
   *                            deleteAdminAll
   ********************************************************************/

  @Delete("admin/all")
  @ApiOperation({ summary: "Api for deleteAdminAll" })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "DESCSTATUS" })
  async deleteAdminAll(): Promise<void> {
    await this.userService.deleteAdminAll();
  }
}
