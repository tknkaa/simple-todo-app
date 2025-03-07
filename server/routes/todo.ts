import express from "express";
import { PrismaClient } from "@prisma/client";

export const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const todos = await prisma.toDo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to read todos." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== "string") {
      res.status(400).json({ error: "'title' must not be empty." });
    }
    const newTodo = await prisma.toDo.create({
      data: {
        title: title,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to create new todo." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.toDo.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to delete todo." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const newTodo = await prisma.toDo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
      },
    });
    res.status(200).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to update todo." });
  }
});
