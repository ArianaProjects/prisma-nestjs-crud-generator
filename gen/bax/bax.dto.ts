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

export class ConnectBaxDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateBaxDto {}

export class UpdateBaxDto {}

export class FindBaxDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
