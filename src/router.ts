import { Router } from "express";
import { SignUpController } from "./controllers/SignUpController";
import prisma from "./client/client";
import { validate } from "./middleware/zod-middleware";
import { signupSchema } from "./@types/signupSchema";
import { SignInController } from "./controllers/SignInController";
import { signInSchema } from "./@types/signinSchema";
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
router.post("/signup", validate(signupSchema), new SignUpController().create);
router.post("/signin", validate(signInSchema), new SignInController().login);

export default router;
