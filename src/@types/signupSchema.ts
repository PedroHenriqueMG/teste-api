import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const signupSchema = z.object({
  name: z.string().openapi({
    example: "Lucas Baiter",
  }),
  email: z.string().email().openapi({
    example: "lucas@gmail.com",
  }),
  password: z
    .string()
    .min(6, "A senha precisa ter mais de 6 caracteres")
    .max(20, "A senha não pode exceder o maximo de 20 caracteres")
    .openapi({
      example: "123456",
    }),
  phone: z.string().openapi({
    example: "1241241241",
  }),
  role: z.string().openapi({
    example: "admin",
  }),
});

export type SignupSchemaProps = z.infer<typeof signupSchema>;
