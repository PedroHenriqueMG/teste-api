import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../helpers/api-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class SignInController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const token = jwt.sign({ role: user.role }, process.env.JWT_PASS ?? " ", {
      expiresIn: "8h",
    });

    const { password: _, ...userData } = user;

    return res.json({
      userData,
      token: token,
    });
  }
}
