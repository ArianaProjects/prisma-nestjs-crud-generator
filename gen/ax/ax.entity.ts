import { Exclude, Expose } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEnum,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../address/address.entity";
import { Prisma } from "@prisma/client";

export class Ax {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt?: Date | null;

  @ApiProperty({ isArray: true, type: Address })
  @IsArray()
  @IsOptional()
  @ValidateNested()
  Address?: Address;

  @ApiProperty({})
  @IsDecimal()
  paymentAmountNet: Prisma.Decimal;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  aa?: string | null;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  preparationTime: number;
}
