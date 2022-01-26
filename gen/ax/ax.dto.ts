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

export class ConnectAxDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateAxDto {
  @ApiProperty({})
  @IsDecimal()
  paymentAmountNet: Prisma.Decimal;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  aa?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  preparationTime: number;
}

export class UpdateAxDto {
  @ApiProperty({})
  @IsDecimal()
  paymentAmountNet: Prisma.Decimal;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  aa?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  preparationTime: number;
}

export class FindAxDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
