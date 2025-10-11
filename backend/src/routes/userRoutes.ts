import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
const router = Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    await prisma.user.create({data: {name, email}})
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(400).json({error: "User not created"})
  }
});

// Delete user by ID

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({error: "Invalid user id"})

  try{
    await prisma.user.delete({where: {id}});
    const users = await prisma.user.findMany();
    res.json(users);
  } catch(error) {
    res.status(404).json({error: "User not found"})
  }
})

export default router;
