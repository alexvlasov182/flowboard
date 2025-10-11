import { Router } from "express";
import { PrismaClient } from "../generated/prisma"; // default import

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  await prisma.user.create({data: {name, email}})
  const user = await prisma.user.findMany();
  res.json(user);
});

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
