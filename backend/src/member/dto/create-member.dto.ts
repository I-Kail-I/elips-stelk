import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MemberRole } from '@/generated/prisma/enums';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: MemberRole })
  @IsEnum(MemberRole)
  @IsNotEmpty()
  role!: MemberRole;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_leader_active!: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_tamat!: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];
}
