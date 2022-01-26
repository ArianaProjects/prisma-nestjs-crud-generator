import { PrismaService } from "src/shared/services/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Ax } from "./ax.entity";
import { FindAxDto, CreateAxDto, UpdateAxDto, ConnectAxDto } from "./ax.dto";
import { Address } from "../address/address.entity";
import {} from "@prisma/client";

@Injectable()
export class AxService {
  constructor(private prismaService: PrismaService) {}

  async exist(query: FindAxDto): Promise<Boolean> {
    const ret = await this.prismaService.ax.findMany({
      where: {
        id: query["id"],
      },
    });
    return ret.lenth > 0;
  }

  async findUniq(param: ConnectAxDto): Promise<Ax> {
    const ret = await this.prismaService.ax.findUnique({
      where: {
        id: param["id"],
      },
    });
    return ret;
  }

  async findMany(query: Ax): Promise<Ax[]> {
    const ret = await this.prismaService.ax.findMany({
      where: {
        id: query["id"],
        createdAt: query["createdAt"],
        updatedAt: query["updatedAt"],
        deletedAt: query["deletedAt"],
        Address: query["Address"],
        paymentAmountNet: query["paymentAmountNet"],
        aa: query["aa"],
        preparationTime: query["preparationTime"],
      },
    });
    return ret;
  }

  async getAll(): Promise<Ax[]> {
    const ret = await this.prismaService.ax.findMany({
      where: {},
    });
    return ret;
  }

  async createOne(body: CreateAxDto): Promise<Ax> {
    const ret = await this.prismaService.ax.create({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        paymentAmountNet: body["paymentAmountNet"],
        aa: body["aa"],
        preparationTime: body["preparationTime"],
      },
    });
    return ret;
  }

  async createMany(body: CreateAxDto): Promise<Ax[]> {
    const ret = await this.prismaService.ax.createMany({
      data: [
        body.map((b) => {
          return {
            id: b["id"],
            createdAt: b["createdAt"],
            updatedAt: b["updatedAt"],
            deletedAt: b["deletedAt"],
            Address: b["Address"],
            paymentAmountNet: b["paymentAmountNet"],
            aa: b["aa"],
            preparationTime: b["preparationTime"],
          };
        }),
      ],
    });
    return ret;
  }

  async updateOne(body: UpdateAxDto, param: ConnectAxDto): Promise<void> {
    const ret = await this.prismaService.ax.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        paymentAmountNet: body["paymentAmountNet"],
        aa: body["aa"],
        preparationTime: body["preparationTime"],
      },
    });
  }

  async updateMany(body: UpdateAxDto, param: ConnectAxDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.ax.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        paymentAmountNet: body["paymentAmountNet"],
        aa: body["aa"],
        preparationTime: body["preparationTime"],
      },
    });
  }

  async updateAll(body: UpdateAxDto): Promise<void> {
    const ret = await this.prismaService.ax.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        paymentAmountNet: body["paymentAmountNet"],
        aa: body["aa"],
        preparationTime: body["preparationTime"],
      },
    });
  }

  async updateAdminOne(body: UpdateAxDto, param: ConnectAxDto): Promise<void> {
    const ret = await this.prismaService.ax.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        paymentAmountNet: body["paymentAmountNet"],
        aa: body["aa"],
        preparationTime: body["preparationTime"],
      },
    });
  }

  async updateAdminMany(body: UpdateAxDto, param: ConnectAxDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.ax.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        paymentAmountNet: body["paymentAmountNet"],
        aa: body["aa"],
        preparationTime: body["preparationTime"],
      },
    });
  }

  async updateAdminAll(body: UpdateAxDto): Promise<void> {
    const ret = await this.prismaService.ax.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        paymentAmountNet: body["paymentAmountNet"],
        aa: body["aa"],
        preparationTime: body["preparationTime"],
      },
    });
  }

  async deleteOne(param: ConnectAxDto): Promise<void> {
    const ret = await this.prismaService.ax.update({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteMany(param: ConnectAxDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.ax.updateMany({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteAll(): Promise<void> {
    // TODO
    const ret = await this.prismaService.ax.updateMany({
      data: { deletedAt: new Date() },
    });
  }

  async deleteAdminOne(param: ConnectAxDto): Promise<void> {
    const ret = await this.prismaService.ax.delete({
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminMany(param: ConnectAxDto): Promise<void> {
    const ret = await this.prismaService.ax.deleteMany({
      // TODO
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminAll(): Promise<void> {
    const ret = await this.prismaService.ax.deleteMany({
      where: {},
    });
  }
}
