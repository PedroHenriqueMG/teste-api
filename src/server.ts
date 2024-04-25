import "express-async-errors";
import Express from "express";
import cors from "cors";
import router from "./router";
import { errorMiddleware } from "./middleware/error";
import prisma from "./client/client";
import swaggerui from "swagger-ui-express";
import { swaggeryaml } from "./swagger/swagger";
import * as yaml from "yaml";
import { corsMiddleware } from "./middleware/cors-middleware";

const app = Express();
app.use(Express.json());

app.use(corsMiddleware, cors());

app.use(router);

prisma
  .$connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error: Error) => {
    throw new Error(error.message);
  });

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

const swaggerdocument = yaml.parse(swaggeryaml);

app.use(
  "/docs",
  swaggerui.serve,
  swaggerui.setup(swaggerdocument, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  }),
);

app.use(errorMiddleware);
app.listen(process.env.PORT, () =>
  console.log(`API rodando na porta: ${process.env.PORT}`),
);

export default app;
