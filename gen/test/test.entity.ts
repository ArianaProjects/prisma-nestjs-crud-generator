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
import { Prisma, NotificationType, Language } from "@prisma/client";

export class Test {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ type: User })
  @IsOptional()
  @ValidateNested()
  User?: User;

  @ApiProperty({ enum: NotificationType })
  @IsOptional()
  @IsEnum(NotificationType)
  xx?: NotificationType | null;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ enum: Language })
  @IsNotEmpty()
  @IsEnum(Language)
  lang: Language;
}
