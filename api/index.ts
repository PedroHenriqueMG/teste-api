import Express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = Express();

app.get("/", (req, res) => res.send("Express on Vercel"));

prisma
  .$connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error: Error) => {
    throw new Error(error.message);
  });

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;
