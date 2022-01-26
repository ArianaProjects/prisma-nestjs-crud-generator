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

export class ConnectTestDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class CreateTestDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdateTestDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class FindTestDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  id: string;
}
