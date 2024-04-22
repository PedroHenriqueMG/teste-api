import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-error";
import prisma from "../client/client";
import bcrypt from "bcrypt";

export class SignUpController {
  async create(req: Request, res: Response) {
    /* const { name, email, password, phone, role } = req.body;

    const emailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      throw new BadRequestError("Esse email já existe");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: {
        name: name,
        password: hashPassword,
        phone: phone,
        role: role,
        email: email,
      },
    });

    const { password: _, ...userData } = createUser; */

    return res.send("hello word");
  }
}
