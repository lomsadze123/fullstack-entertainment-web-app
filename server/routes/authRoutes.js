import { Router } from "express";
import { authToken } from "../utils/middlewares.js";
import { checkPassword } from "../utils/middlewares.js";
import login from "../controllers/login.js";
import { getUser, postUser } from "../controllers/users.js";
const router = Router();

router.post("/login", checkPassword, authToken, login);
router.get("/users", getUser);
router.post("/users", postUser);

export default router;
