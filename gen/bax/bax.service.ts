import { PrismaService } from "src/shared/services/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bax } from "./bax.entity";
import {
  FindBaxDto,
  CreateBaxDto,
  UpdateBaxDto,
  ConnectBaxDto,
} from "./bax.dto";
import { Address } from "../address/address.entity";
import {} from "@prisma/client";

@Injectable()
export class BaxService {
  constructor(private prismaService: PrismaService) {}

  async exist(query: FindBaxDto): Promise<Boolean> {
    const ret = await this.prismaService.bax.findMany({
      where: {
        id: query["id"],
      },
    });
    return ret.lenth > 0;
  }

  async findUniq(param: ConnectBaxDto): Promise<Bax> {
    const ret = await this.prismaService.bax.findUnique({
      where: {
        id: param["id"],
      },
    });
    return ret;
  }

  async findMany(query: Bax): Promise<Bax[]> {
    const ret = await this.prismaService.bax.findMany({
      where: {
        id: query["id"],
        createdAt: query["createdAt"],
        updatedAt: query["updatedAt"],
        deletedAt: query["deletedAt"],
        Address: query["Address"],
      },
    });
    return ret;
  }

  async getAll(): Promise<Bax[]> {
    const ret = await this.prismaService.bax.findMany({
      where: {},
    });
    return ret;
  }

  async createOne(body: CreateBaxDto): Promise<Bax> {
    const ret = await this.prismaService.bax.create({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
      },
    });
    return ret;
  }

  async createMany(body: CreateBaxDto): Promise<Bax[]> {
    const ret = await this.prismaService.bax.createMany({
      data: [
        body.map((b) => {
          return {
            id: b["id"],
            createdAt: b["createdAt"],
            updatedAt: b["updatedAt"],
            deletedAt: b["deletedAt"],
            Address: b["Address"],
          };
        }),
      ],
    });
    return ret;
  }

  async updateOne(body: UpdateBaxDto, param: ConnectBaxDto): Promise<void> {
    const ret = await this.prismaService.bax.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
      },
    });
  }

  async updateMany(body: UpdateBaxDto, param: ConnectBaxDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.bax.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
      },
    });
  }

  async updateAll(body: UpdateBaxDto): Promise<void> {
    const ret = await this.prismaService.bax.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
      },
    });
  }

  async updateAdminOne(
    body: UpdateBaxDto,
    param: ConnectBaxDto
  ): Promise<void> {
    const ret = await this.prismaService.bax.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
      },
    });
  }

  async updateAdminMany(
    body: UpdateBaxDto,
    param: ConnectBaxDto
  ): Promise<void> {
    // TODO
    const ret = await this.prismaService.bax.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
      },
    });
  }

  async updateAdminAll(body: UpdateBaxDto): Promise<void> {
    const ret = await this.prismaService.bax.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
      },
    });
  }

  async deleteOne(param: ConnectBaxDto): Promise<void> {
    const ret = await this.prismaService.bax.update({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteMany(param: ConnectBaxDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.bax.updateMany({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteAll(): Promise<void> {
    // TODO
    const ret = await this.prismaService.bax.updateMany({
      data: { deletedAt: new Date() },
    });
  }

  async deleteAdminOne(param: ConnectBaxDto): Promise<void> {
    const ret = await this.prismaService.bax.delete({
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminMany(param: ConnectBaxDto): Promise<void> {
    const ret = await this.prismaService.bax.deleteMany({
      // TODO
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminAll(): Promise<void> {
    const ret = await this.prismaService.bax.deleteMany({
      where: {},
    });
  }
}
