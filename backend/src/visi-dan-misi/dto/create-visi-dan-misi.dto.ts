import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVisiDanMisiDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  visi!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  misi!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tahun_mulai!: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tahun_akhir!: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_active!: boolean;
}
