import express from "express";
import cors from "cors";
import { router as todoRouter } from "./routes/todo";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todo", todoRouter);

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
