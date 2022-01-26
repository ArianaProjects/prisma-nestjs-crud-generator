import { PrismaService } from "src/shared/services/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Address } from "./address.entity";
import {
  FindAddressDto,
  CreateAddressDto,
  UpdateAddressDto,
  ConnectAddressDto,
} from "./address.dto";
import { User } from "../user/user.entity";
import { Tax } from "../tax/tax.entity";
import { Bax } from "../bax/bax.entity";
import { Ax } from "../ax/ax.entity";
import { Language } from "@prisma/client";

@Injectable()
export class AddressService {
  constructor(private prismaService: PrismaService) {}

  async exist(query: FindAddressDto): Promise<Boolean> {
    const ret = await this.prismaService.address.findMany({
      where: {
        id: query["id"],
      },
    });
    return ret.lenth > 0;
  }

  async findUniq(param: ConnectAddressDto): Promise<Address> {
    const ret = await this.prismaService.address.findUnique({
      where: {
        id: param["id"],
      },
    });
    return ret;
  }

  async findMany(query: Address): Promise<Address[]> {
    const ret = await this.prismaService.address.findMany({
      where: {
        id: query["id"],
        createdAt: query["createdAt"],
        updatedAt: query["updatedAt"],
        deletedAt: query["deletedAt"],
        User: query["User"],
        lang: query["lang"],
        Tax: query["Tax"],
        Bax: query["Bax"],
        baxId: query["baxId"],
        Ax: query["Ax"],
        axId: query["axId"],
        line1: query["line1"],
        line2: query["line2"],
        line3: query["line3"],
        city: query["city"],
        zipcode: query["zipcode"],
        userId: query["userId"],
      },
    });
    return ret;
  }

  async getAll(): Promise<Address[]> {
    const ret = await this.prismaService.address.findMany({
      where: {},
    });
    return ret;
  }

  async createOne(body: CreateAddressDto): Promise<Address> {
    const ret = await this.prismaService.address.create({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        User: body["User"],
        lang: body["lang"],
        Tax: body["Tax"],
        Bax: body["Bax"],
        baxId: body["baxId"],
        Ax: body["Ax"],
        axId: body["axId"],
        line1: body["line1"],
        line2: body["line2"],
        line3: body["line3"],
        city: body["city"],
        zipcode: body["zipcode"],
        userId: body["userId"],
      },
    });
    return ret;
  }

  async createMany(body: CreateAddressDto): Promise<Address[]> {
    const ret = await this.prismaService.address.createMany({
      data: [
        body.map((b) => {
          return {
            id: b["id"],
            createdAt: b["createdAt"],
            updatedAt: b["updatedAt"],
            deletedAt: b["deletedAt"],
            User: b["User"],
            lang: b["lang"],
            Tax: b["Tax"],
            Bax: b["Bax"],
            baxId: b["baxId"],
            Ax: b["Ax"],
            axId: b["axId"],
            line1: b["line1"],
            line2: b["line2"],
            line3: b["line3"],
            city: b["city"],
            zipcode: b["zipcode"],
            userId: b["userId"],
          };
        }),
      ],
    });
    return ret;
  }

  async updateOne(
    body: UpdateAddressDto,
    param: ConnectAddressDto
  ): Promise<void> {
    const ret = await this.prismaService.address.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        User: body["User"],
        lang: body["lang"],
        Tax: body["Tax"],
        Bax: body["Bax"],
        baxId: body["baxId"],
        Ax: body["Ax"],
        axId: body["axId"],
        line1: body["line1"],
        line2: body["line2"],
        line3: body["line3"],
        city: body["city"],
        zipcode: body["zipcode"],
        userId: body["userId"],
      },
    });
  }

  async updateMany(
    body: UpdateAddressDto,
    param: ConnectAddressDto
  ): Promise<void> {
    // TODO
    const ret = await this.prismaService.address.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        User: body["User"],
        lang: body["lang"],
        Tax: body["Tax"],
        Bax: body["Bax"],
        baxId: body["baxId"],
        Ax: body["Ax"],
        axId: body["axId"],
        line1: body["line1"],
        line2: body["line2"],
        line3: body["line3"],
        city: body["city"],
        zipcode: body["zipcode"],
        userId: body["userId"],
      },
    });
  }

  async updateAll(body: UpdateAddressDto): Promise<void> {
    const ret = await this.prismaService.address.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        User: body["User"],
        lang: body["lang"],
        Tax: body["Tax"],
        Bax: body["Bax"],
        baxId: body["baxId"],
        Ax: body["Ax"],
        axId: body["axId"],
        line1: body["line1"],
        line2: body["line2"],
        line3: body["line3"],
        city: body["city"],
        zipcode: body["zipcode"],
        userId: body["userId"],
      },
    });
  }

  async updateAdminOne(
    body: UpdateAddressDto,
    param: ConnectAddressDto
  ): Promise<void> {
    const ret = await this.prismaService.address.update({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        User: body["User"],
        lang: body["lang"],
        Tax: body["Tax"],
        Bax: body["Bax"],
        baxId: body["baxId"],
        Ax: body["Ax"],
        axId: body["axId"],
        line1: body["line1"],
        line2: body["line2"],
        line3: body["line3"],
        city: body["city"],
        zipcode: body["zipcode"],
        userId: body["userId"],
      },
    });
  }

  async updateAdminMany(
    body: UpdateAddressDto,
    param: ConnectAddressDto
  ): Promise<void> {
    // TODO
    const ret = await this.prismaService.address.updateMany({
      where: {
        id: param["id"],
      },
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        User: body["User"],
        lang: body["lang"],
        Tax: body["Tax"],
        Bax: body["Bax"],
        baxId: body["baxId"],
        Ax: body["Ax"],
        axId: body["axId"],
        line1: body["line1"],
        line2: body["line2"],
        line3: body["line3"],
        city: body["city"],
        zipcode: body["zipcode"],
        userId: body["userId"],
      },
    });
  }

  async updateAdminAll(body: UpdateAddressDto): Promise<void> {
    const ret = await this.prismaService.address.updateMany({
      data: {
        id: body["id"],
        createdAt: body["createdAt"],
        updatedAt: body["updatedAt"],
        deletedAt: body["deletedAt"],
        User: body["User"],
        lang: body["lang"],
        Tax: body["Tax"],
        Bax: body["Bax"],
        baxId: body["baxId"],
        Ax: body["Ax"],
        axId: body["axId"],
        line1: body["line1"],
        line2: body["line2"],
        line3: body["line3"],
        city: body["city"],
        zipcode: body["zipcode"],
        userId: body["userId"],
      },
    });
  }

  async deleteOne(param: ConnectAddressDto): Promise<void> {
    const ret = await this.prismaService.address.update({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteMany(param: ConnectAddressDto): Promise<void> {
    // TODO
    const ret = await this.prismaService.address.updateMany({
      where: {
        id: param["id"],
      },
      data: { deletedAt: new Date() },
    });
  }

  async deleteAll(): Promise<void> {
    // TODO
    const ret = await this.prismaService.address.updateMany({
      data: { deletedAt: new Date() },
    });
  }

  async deleteAdminOne(param: ConnectAddressDto): Promise<void> {
    const ret = await this.prismaService.address.delete({
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminMany(param: ConnectAddressDto): Promise<void> {
    const ret = await this.prismaService.address.deleteMany({
      // TODO
      where: {
        id: param["id"],
      },
    });
  }

  async deleteAdminAll(): Promise<void> {
    const ret = await this.prismaService.address.deleteMany({
      where: {},
    });
  }
}
