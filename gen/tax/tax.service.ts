import { PrismaService } from "src/shared/services/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Tax } from "./tax.entity";
import {
  FindTaxDto,
  CreateTaxDto,
  UpdateTaxDto,
  ConnectTaxDto,
} from "./tax.dto";
import { Address } from "../address/address.entity";
import {} from "@prisma/client";

@Injectable()
export class TaxService {
  constructor(private prismaService: PrismaService) {}

  async exist(query: FindTaxDto): Promise<Boolean> {
    const ret = await this.prismaService.tax.findMany({
      where: {
        id: query["id"],
      },
    });
    return ret.lenth > 0;
  }

  async findUniq(param: ConnectTaxDto): Promise<Tax> {
    const ret = await this.prismaService.tax.findUnique({
      where: {
        id: param["id"],
      },
    });
    return ret;
  }

  async findMany(query: Tax): Promise<Tax[]> {
    const ret = await this.prismaService.tax.findMany({
      where: {
        id: query["id"],
        createdAt: query["createdAt"],
        updatedAt: query["updatedAt"],
        deletedAt: query["deletedAt"],
        Address: query["Address"],
        addressId: query["addressId"],
      },
    });
    return ret;
  }

  async getAll(): Promise<Tax[]> {
    const ret = await this.prismaService.tax.findMany({
      where: {},
    });
    return ret;
  }

  async createOne(body: CreateTaxDto): Promise<Tax> {
    const ret = await this.prismaService.tax.create({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        addressId: body["addressId"],
      },
    });
    return ret;
  }

  async createMany(body: CreateTaxDto): Promise<Tax[]> {
    const ret = await this.prismaService.tax.createMany({
      data: [
        body.map((b) => {
          return {
            id: b["id"],
            createdAt: b["createdAt"],
            updatedAt: b["updatedAt"],
            deletedAt: b["deletedAt"],
            Address: b["Address"],
            addressId: b["addressId"],
          };
        }),
      ],
    });
    return ret;
  }

  async updateOne(body: UpdateTaxDto, param: ConnectTaxDto): Promise<void> {
    const ret = await this.prismaService.tax.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        addressId: body["addressId"],
      },
    });
  }

  async updateMany(body: UpdateTaxDto, param: ConnectTaxDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.tax.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        addressId: body["addressId"],
      },
    });
  }

  async updateAll(body: UpdateTaxDto): Promise<void> {
    const ret = await this.prismaService.tax.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        addressId: body["addressId"],
      },
    });
  }

  async updateAdminOne(
    body: UpdateTaxDto,
    param: ConnectTaxDto
  ): Promise<void> {
    const ret = await this.prismaService.tax.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        addressId: body["addressId"],
      },
    });
  }

  async updateAdminMany(
    body: UpdateTaxDto,
    param: ConnectTaxDto
  ): Promise<void> {
    // TODO
    const ret = await this.prismaService.tax.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        addressId: body["addressId"],
      },
    });
  }

  async updateAdminAll(body: UpdateTaxDto): Promise<void> {
    const ret = await this.prismaService.tax.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        Address: body["Address"],
        addressId: body["addressId"],
      },
    });
  }

  async deleteOne(param: ConnectTaxDto): Promise<void> {
    const ret = await this.prismaService.tax.update({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteMany(param: ConnectTaxDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.tax.updateMany({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteAll(): Promise<void> {
    // TODO
    const ret = await this.prismaService.tax.updateMany({
      data: { deletedAt: new Date() },
    });
  }

  async deleteAdminOne(param: ConnectTaxDto): Promise<void> {
    const ret = await this.prismaService.tax.delete({
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminMany(param: ConnectTaxDto): Promise<void> {
    const ret = await this.prismaService.tax.deleteMany({
      // TODO
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminAll(): Promise<void> {
    const ret = await this.prismaService.tax.deleteMany({
      where: {},
    });
  }
}
