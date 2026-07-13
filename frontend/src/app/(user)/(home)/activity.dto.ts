import z, { date, string } from 'zod';

export const ActivitySchema = z.object({
  title: string(),
  description: string(),
  markdown_file: string(),
  image: string(),
  created_at: date(),
  updated_at: date(),
});

export type ActivityType = z.infer<typeof ActivitySchema>;
