import { PrismaService } from "src/shared/services/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import {
  FindUserDto,
  CreateUserDto,
  UpdateUserDto,
  ConnectUserDto,
} from "./user.dto";
import { Test } from "../test/test.entity";
import { Address } from "../address/address.entity";
import { NotificationType } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async exist(query: FindUserDto): Promise<Boolean> {
    const ret = await this.prismaService.user.findMany({
      where: {
        id: query["id"],
        email: query["email"],
      },
    });
    return ret.lenth > 0;
  }

  async findUniq(param: ConnectUserDto): Promise<User> {
    const ret = await this.prismaService.user.findUnique({
      where: {
        id: param["id"],
      },
    });
    return ret;
  }

  async findMany(query: User): Promise<User[]> {
    const ret = await this.prismaService.user.findMany({
      where: {
        id: query["id"],
        email: query["email"],
        name: query["name"],
        xx: query["xx"],
        Test: query["Test"],
        Address: query["Address"],
      },
    });
    return ret;
  }

  async getAll(): Promise<User[]> {
    const ret = await this.prismaService.user.findMany({
      where: {},
    });
    return ret;
  }

  async createOne(body: CreateUserDto): Promise<User> {
    const ret = await this.prismaService.user.create({
      data: {
        id: body["id"],
        email: body["email"],
        name: body["name"],
        xx: body["xx"],
        Test: body["Test"],
        Address: body["Address"],
      },
    });
    return ret;
  }

  async createMany(body: CreateUserDto): Promise<User[]> {
    const ret = await this.prismaService.user.createMany({
      data: [
        body.map((b) => {
          return {
            id: b["id"],
            email: b["email"],
            name: b["name"],
            xx: b["xx"],
            Test: b["Test"],
            Address: b["Address"],
          };
        }),
      ],
    });
    return ret;
  }

  async updateOne(body: UpdateUserDto, param: ConnectUserDto): Promise<void> {
    const ret = await this.prismaService.user.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        email: body["email"],
        name: body["name"],
        xx: body["xx"],
        Test: body["Test"],
        Address: body["Address"],
      },
    });
  }

  async updateMany(body: UpdateUserDto, param: ConnectUserDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.user.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        email: body["email"],
        name: body["name"],
        xx: body["xx"],
        Test: body["Test"],
        Address: body["Address"],
      },
    });
  }

  async updateAll(body: UpdateUserDto): Promise<void> {
    const ret = await this.prismaService.user.updateMany({
      data: {
        id: body["id"],
        email: body["email"],
        name: body["name"],
        xx: body["xx"],
        Test: body["Test"],
        Address: body["Address"],
      },
    });
  }

  async updateAdminOne(
    body: UpdateUserDto,
    param: ConnectUserDto
  ): Promise<void> {
    const ret = await this.prismaService.user.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        email: body["email"],
        name: body["name"],
        xx: body["xx"],
        Test: body["Test"],
        Address: body["Address"],
      },
    });
  }

  async updateAdminMany(
    body: UpdateUserDto,
    param: ConnectUserDto
  ): Promise<void> {
    // TODO
    const ret = await this.prismaService.user.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        email: body["email"],
        name: body["name"],
        xx: body["xx"],
        Test: body["Test"],
        Address: body["Address"],
      },
    });
  }

  async updateAdminAll(body: UpdateUserDto): Promise<void> {
    const ret = await this.prismaService.user.updateMany({
      data: {
        id: body["id"],
        email: body["email"],
        name: body["name"],
        xx: body["xx"],
        Test: body["Test"],
        Address: body["Address"],
      },
    });
  }

  async deleteOne(param: ConnectUserDto): Promise<void> {
    const ret = await this.prismaService.user.update({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteMany(param: ConnectUserDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.user.updateMany({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteAll(): Promise<void> {
    // TODO
    const ret = await this.prismaService.user.updateMany({
      data: { deletedAt: new Date() },
    });
  }

  async deleteAdminOne(param: ConnectUserDto): Promise<void> {
    const ret = await this.prismaService.user.delete({
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminMany(param: ConnectUserDto): Promise<void> {
    const ret = await this.prismaService.user.deleteMany({
      // TODO
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminAll(): Promise<void> {
    const ret = await this.prismaService.user.deleteMany({
      where: {},
    });
  }
}
