import z from 'zod';

export const VisiDanMisiSchema = z.object({
  id: z.number(),
  visi: z.string(),
  misi: z.string(),
  is_active: z.boolean(),
  tahun_mulai: z.number(),
  tahun_akhir: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type VisiDanMisiType = z.infer<typeof VisiDanMisiSchema>;
