import "express-async-errors";
import Express from "express";
import router from "./router";
import { errorMiddleware } from "./middleware/error";
import prisma from "./client/client";
import swaggerui from "swagger-ui-express";
import { document } from "./swagger/swagger";
import * as yaml from "yaml";

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

const path = "./swagger/openapi.yml";
const teste = yaml.parse(path);

app.use("/docs", swaggerui.serve, swaggerui.setup(teste));

app.use(errorMiddleware);
app.listen(process.env.PORT, () =>
  console.log(`API rodando na porta: ${process.env.PORT}`)
);

export default app;
