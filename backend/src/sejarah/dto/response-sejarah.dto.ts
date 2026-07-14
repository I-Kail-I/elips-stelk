import { Expose } from 'class-transformer';

export class ResponseSejarahDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  created_at!: Date;

  @Expose()
  updated_at!: Date | null;
}
