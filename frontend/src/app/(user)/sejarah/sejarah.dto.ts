import z, { date, number, string } from 'zod';

export const SejarahSchema = z.object({
  id: number(),
  title: string(),
  description: string(),
  created_at: date(),
  updated_at: date(),
});

export type SejarahType = z.infer<typeof SejarahSchema>;
