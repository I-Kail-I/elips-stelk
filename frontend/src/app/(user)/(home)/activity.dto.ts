import z, { number, string } from 'zod';

export const ActivitySchema = z.array(
  z.object({
    id: number(),
    title: string(),
    description: string(),
    markdown_file: string(),
    cover_image: string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
);

export type ActivityType = z.infer<typeof ActivitySchema>;
