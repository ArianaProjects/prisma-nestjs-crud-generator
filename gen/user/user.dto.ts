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

export class ConnectUserDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateUserDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateUserDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  name?: string;
}

export class FindUserDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  email: string;
}
