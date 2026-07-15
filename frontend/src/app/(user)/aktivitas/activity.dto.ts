import z, { number, string } from 'zod';

export const ActivitySchema = z.object({
  id: number(),
  title: string(),
  description: string(),
  markdown_file: string(),
  cover_image: string().nullable(),
  created_at: string(),
  updated_at: string().nullable(),
});

export type ActivityType = z.infer<typeof ActivitySchema>;
