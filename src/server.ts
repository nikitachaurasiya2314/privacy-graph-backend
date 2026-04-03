import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import relationshipRoutes from "./routes/relationships.routes";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(helmet());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/relationships", relationshipRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});