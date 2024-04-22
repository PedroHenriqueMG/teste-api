import Express from "express";
import router from "./router";
import { errorMiddleware } from "./middleware/error";

const app = Express();
app.use(Express.json());

app.use(router);

/* app.use(errorMiddleware); */
app.listen(process.env.PORT, () =>
  console.log(`Server ready on port: ${process.env.PORT}`)
);

export default app;
