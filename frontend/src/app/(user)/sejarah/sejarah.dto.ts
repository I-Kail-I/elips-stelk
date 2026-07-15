import z, { number, string } from 'zod';

export const SejarahSchema = z.object({
  id: number(),
  title: string(),
  description: string(),
  created_at: string(),
  updated_at: string().nullable(),
});

export type SejarahType = z.infer<typeof SejarahSchema>;
