import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import pageRoutes from './routes/page.routes';
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/pages", pageRoutes);

// global error handler
app.use(errorHandler);

export default app;
