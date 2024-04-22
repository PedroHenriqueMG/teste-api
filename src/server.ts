import Express from "express";
import prisma from "./client/client";

const app = Express();

app.get("/", async (req, res) => {
  res.send("Express on Vercel");
});

app.get("/test", (req, res) => {
  prisma
    .$connect()
    .then(() => {
      return res.send("Conexão com o banco de dados estabelecida com sucesso.");
    })
    .catch((error: Error) => {
      return res.status(500).send(error.message);
    });
});

app.listen(process.env.PORT, () =>
  console.log(`Server ready on port: ${process.env.PORT}`)
);

export default app;
