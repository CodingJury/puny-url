import z from "zod"

export const urlSchemaValidator = z.object({
  originalUrl: z.string().min(1).url(),
});

export type urlSchemaValidator = z.infer<typeof urlSchemaValidator>;