import express from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.routes"
import pageRoutes from './modules/page/page.routes';
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from './swagger';

const app = express();


app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/pages", pageRoutes);


setupSwagger(app);
// global error handler
app.use(errorHandler);


export default app;
