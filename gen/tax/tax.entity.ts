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

export class Tax {
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

  @ApiProperty({ type: Address })
  @IsOptional()
  @ValidateNested()
  Address?: Address | null;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  addressId?: number | null;
}
