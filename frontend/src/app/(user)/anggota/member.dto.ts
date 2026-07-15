import z, { boolean, number, string } from 'zod';

export const MemberSchema = z.object({
  id: number(),
  name: string(),
  role: string(),
  message: string(),
  cover_image: string().nullable(),
  is_leader_active: boolean(),
  is_tamat: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type MemberType = z.infer<typeof MemberSchema>;
