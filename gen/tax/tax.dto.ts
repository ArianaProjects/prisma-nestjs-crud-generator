import { Exclude, Expose } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class ConnectTaxDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateTaxDto {
  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  addressId?: number;
}

export class UpdateTaxDto {
  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  addressId?: number;
}

export class FindTaxDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
