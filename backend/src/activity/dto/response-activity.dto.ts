import { Expose } from 'class-transformer';

export class ResponseActivityDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  markdown_file!: string;

  @Expose()
  cover_image?: string;

  @Expose()
  created_at!: Date;

  @Expose()
  updated_at!: Date | null;
}
