import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const todos = await prisma.toDo.findMany();
  res.json(todos);
});

app.post("/create", async (req, res) => {
  const { title } = req.body;
  const newTodo = await prisma.toDo.create({
    data: {
      title: title,
    },
  });
  res.status(201).json(newTodo);
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.toDo.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200);
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const newTodo = await prisma.toDo.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
    },
  });
  res.status(200).json(newTodo);
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
