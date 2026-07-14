import { Expose } from 'class-transformer';

export class ResponseVisiDanMisiDto {
  @Expose()
  visi!: string;

  @Expose()
  misi!: string;

  @Expose()
  is_active!: boolean;

  @Expose()
  tahun_mulai!: number;

  @Expose()
  tahun_akhir!: number;

  @Expose()
  created_at!: Date;

  @Expose()
  updated_at!: Date | null;
}
