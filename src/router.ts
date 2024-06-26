import { Router } from "express";
import { SignUpController } from "./controllers/SignUpController";
import { validate } from "./middleware/zod-middleware";
import { signupSchema } from "./@types/signupSchema";
import { SignInController } from "./controllers/SignInController";
import { signInSchema } from "./@types/signinSchema";

const router = Router();

router.get("/", (req, res) => {
  res.send("Express on Vercel");
});
router.post("/signup", validate(signupSchema), new SignUpController().create);
router.post("/signin", validate(signInSchema), new SignInController().login);

export default router;
