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
import { Test } from "../test/test.entity";
import { Address } from "../address/address.entity";
import { Prisma, NotificationType } from "@prisma/client";

export class User {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  name?: string | null;

  @ApiProperty({ enum: NotificationType })
  @IsOptional()
  @IsEnum(NotificationType)
  xx?: NotificationType | null;

  @ApiProperty({ isArray: true, type: Test })
  @IsArray()
  @IsOptional()
  @ValidateNested()
  Test?: Test;

  @ApiProperty({ isArray: true, type: Address })
  @IsArray()
  @IsOptional()
  @ValidateNested()
  Address?: Address;
}
