import { PrismaService } from "src/shared/services/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Test } from "./test.entity";
import {
  FindTestDto,
  CreateTestDto,
  UpdateTestDto,
  ConnectTestDto,
} from "./test.dto";
import { User } from "../user/user.entity";
import { NotificationType, Language } from "@prisma/client";

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async exist(query: FindTestDto): Promise<Boolean> {
    const ret = await this.prismaService.test.findMany({
      where: {
        id: query["id"],
      },
    });
    return ret.lenth > 0;
  }

  async findUniq(param: ConnectTestDto): Promise<Test> {
    const ret = await this.prismaService.test.findUnique({
      where: {
        id: param["id"],
      },
    });
    return ret;
  }

  async findMany(query: Test): Promise<Test[]> {
    const ret = await this.prismaService.test.findMany({
      where: {
        id: query["id"],
        User: query["User"],
        xx: query["xx"],
        userId: query["userId"],
        lang: query["lang"],
      },
    });
    return ret;
  }

  async getAll(): Promise<Test[]> {
    const ret = await this.prismaService.test.findMany({
      where: {},
    });
    return ret;
  }

  async createOne(body: CreateTestDto): Promise<Test> {
    const ret = await this.prismaService.test.create({
      data: {
        id: body["id"],
        User: body["User"],
        xx: body["xx"],
        userId: body["userId"],
        lang: body["lang"],
      },
    });
    return ret;
  }

  async createMany(body: CreateTestDto): Promise<Test[]> {
    const ret = await this.prismaService.test.createMany({
      data: [
        body.map((b) => {
          return {
            id: b["id"],
            User: b["User"],
            xx: b["xx"],
            userId: b["userId"],
            lang: b["lang"],
          };
        }),
      ],
    });
    return ret;
  }

  async updateOne(body: UpdateTestDto, param: ConnectTestDto): Promise<void> {
    const ret = await this.prismaService.test.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        User: body["User"],
        xx: body["xx"],
        userId: body["userId"],
        lang: body["lang"],
      },
    });
  }

  async updateMany(body: UpdateTestDto, param: ConnectTestDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.test.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        User: body["User"],
        xx: body["xx"],
        userId: body["userId"],
        lang: body["lang"],
      },
    });
  }

  async updateAll(body: UpdateTestDto): Promise<void> {
    const ret = await this.prismaService.test.updateMany({
      data: {
        id: body["id"],
        User: body["User"],
        xx: body["xx"],
        userId: body["userId"],
        lang: body["lang"],
      },
    });
  }

  async updateAdminOne(
    body: UpdateTestDto,
    param: ConnectTestDto
  ): Promise<void> {
    const ret = await this.prismaService.test.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        User: body["User"],
        xx: body["xx"],
        userId: body["userId"],
        lang: body["lang"],
      },
    });
  }

  async updateAdminMany(
    body: UpdateTestDto,
    param: ConnectTestDto
  ): Promise<void> {
    // TODO
    const ret = await this.prismaService.test.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        User: body["User"],
        xx: body["xx"],
        userId: body["userId"],
        lang: body["lang"],
      },
    });
  }

  async updateAdminAll(body: UpdateTestDto): Promise<void> {
    const ret = await this.prismaService.test.updateMany({
      data: {
        id: body["id"],
        User: body["User"],
        xx: body["xx"],
        userId: body["userId"],
        lang: body["lang"],
      },
    });
  }

  async deleteOne(param: ConnectTestDto): Promise<void> {
    const ret = await this.prismaService.test.update({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteMany(param: ConnectTestDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.test.updateMany({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteAll(): Promise<void> {
    // TODO
    const ret = await this.prismaService.test.updateMany({
      data: { deletedAt: new Date() },
    });
  }

  async deleteAdminOne(param: ConnectTestDto): Promise<void> {
    const ret = await this.prismaService.test.delete({
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminMany(param: ConnectTestDto): Promise<void> {
    const ret = await this.prismaService.test.deleteMany({
      // TODO
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminAll(): Promise<void> {
    const ret = await this.prismaService.test.deleteMany({
      where: {},
    });
  }
}
