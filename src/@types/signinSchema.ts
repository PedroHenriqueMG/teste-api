import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const signInSchema = z.object({
  email: z.string().email().openapi({
    example: "cleitin@gmail.com",
  }),
  password: z
    .string()
    .min(6, "A senha precisa ter mais de 6 caracteres")
    .max(20, "A senha não pode exceder o maximo de 20 caracteres")
    .openapi({
      example: "123456",
    }),
});

export type LoginSchemaProps = z.infer<typeof signInSchema>;
