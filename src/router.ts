import { Router } from "express";
import { SignUpController } from "./controllers/SignUpController";
import prisma from "./client/client";
const router = Router();

router.get("/", (req, res) => {
  res.send("Express on Vercel");
});
router.get("/test", (req, res) => {
  prisma
    .$connect()
    .then(() => {
      return res.send("Conexão com o banco de dados estabelecida com sucesso.");
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
});
router.post("/signup", new SignUpController().create);

export default router;
