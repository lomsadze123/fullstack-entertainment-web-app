import { Router } from "express";
import authRoutes from "./authRoutes.js";
import bookmarkRoutes from "./bookmarkRoutes.js";

const routers = Router();

routers.use("/", authRoutes);
routers.use("/", bookmarkRoutes);

export default routers;
