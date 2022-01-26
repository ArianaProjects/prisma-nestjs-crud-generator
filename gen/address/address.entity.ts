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
import { User } from "../user/user.entity";
import { Tax } from "../tax/tax.entity";
import { Bax } from "../bax/bax.entity";
import { Ax } from "../ax/ax.entity";
import { Prisma, Language } from "@prisma/client";

export class Address {
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

  @ApiProperty({ type: User })
  @IsOptional()
  @ValidateNested()
  User?: User | null;

  @ApiProperty({ enum: Language })
  @IsNotEmpty()
  @IsEnum(Language)
  lang: Language;

  @ApiProperty({ isArray: true, type: Tax })
  @IsArray()
  @IsOptional()
  @ValidateNested()
  Tax?: Tax;

  @ApiProperty({ type: Bax })
  @IsOptional()
  @ValidateNested()
  Bax?: Bax;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  baxId: number;

  @ApiProperty({ type: Ax })
  @IsOptional()
  @ValidateNested()
  Ax?: Ax | null;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  axId?: number | null;

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
  userId?: number | null;
}
