import "express-async-errors";
import Express from "express";
import router from "./router";
import { errorMiddleware } from "./middleware/error";
import prisma from "./client/client";

const app = Express();
app.use(Express.json());

app.use(router);

prisma
  .$connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error: Error) => {
    throw new Error(error.message);
  });

app.use(errorMiddleware);
app.listen(process.env.PORT, () =>
  console.log(`API rodando na porta: ${process.env.PORT}`)
);

export default app;
