import { z } from "zod";

export const PersonSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  birthDate: z.string().optional(),
  deathDate: z.string().optional(),
});

export type PersonInput = z.infer<typeof PersonSchema>;
