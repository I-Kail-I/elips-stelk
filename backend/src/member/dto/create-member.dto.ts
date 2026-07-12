import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum MemberRole {
  KETUA = 'ketua',
  ANGGOTA = 'anggota',
}

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsEnum(MemberRole)
  @IsNotEmpty()
  role!: MemberRole;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message!: string;
}
