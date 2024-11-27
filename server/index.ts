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

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
