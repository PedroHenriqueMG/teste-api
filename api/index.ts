import Express from "express";
import prisma from "../client/client";

const app = Express();

app.get("/", async (req, res) => {
  await prisma
    .$connect()
    .then(() => {
      console.log("Conexão com o banco de dados estabelecida com sucesso.");
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
  res.send("Express on Vercel");
});

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;
