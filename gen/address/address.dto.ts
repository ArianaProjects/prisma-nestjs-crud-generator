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

export class ConnectAddressDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateAddressDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  baxId: number;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  axId?: number;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  line1: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  line2: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  line3: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  userId?: number;
}

export class UpdateAddressDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  baxId: number;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  axId?: number;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  line1: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  line2: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  line3: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  userId?: number;
}

export class FindAddressDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
