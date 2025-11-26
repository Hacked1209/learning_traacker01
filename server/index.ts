import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize routes
const server = await registerRoutes(app);

// Global Error Handler
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
