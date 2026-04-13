import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import relationshipRoutes from "./routes/relationships.routes";
import interactionRoutes from "./routes/interaction.routes";
import gstRoutes from "./routes/gst.routes";
import panRoutes from "./routes/pan.routes";



const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);app.use(helmet());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api", interactionRoutes);
app.use("/api/gst", gstRoutes);
app.use("/api/pan", panRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});