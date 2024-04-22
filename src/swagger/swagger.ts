import { z } from "zod";
import { createDocument, extendZodWithOpenApi } from "zod-openapi";
import { signupSchema } from "../@types/signupSchema";
import { signInSchema } from "../@types/signinSchema";

extendZodWithOpenApi(z);

const userData = signupSchema.omit({ password: true });

const token = z.string().openapi({
  example:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTM0NzMyNzUsImV4cCI6MTcxMzUwMjA3NX0.J9UdB_g2_z_3GQ7ctnRLAIhm3X5FjqPlDlfpo9Rciog",
});

export const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Barber Shop API",
    description: "Melhor API do Brasil",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://teste-api-smoky.vercel.app",
      description: "testando o teste",
    },
  ],
  paths: {
    "/signup": {
      post: {
        tags: ["User"],
        requestBody: {
          content: {
            "application/json": { schema: signupSchema },
          },
        },
        responses: {
          "400": {
            description: "Esse email já existe",
          },
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: signupSchema.omit({ password: true }),
              },
            },
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["User"],
        requestBody: {
          content: {
            "application/json": { schema: signInSchema },
          },
        },
        responses: {
          "400": {
            description: "Email ou senha inválidos",
          },
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: z.object({
                  userData,
                  token,
                }),
              },
            },
          },
        },
      },
    },
  },
});
