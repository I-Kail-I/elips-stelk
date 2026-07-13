import { Expose } from 'class-transformer';

export class ResponseMemberDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  role!: string;

  @Expose()
  message!: string;

  @Expose()
  image!: string[];

  @Expose()
  is_leader_active!: boolean;

  @Expose()
  is_tamat!: boolean;

  @Expose()
  created_at!: Date;

  @Expose()
  updated_at!: Date | null;
}
