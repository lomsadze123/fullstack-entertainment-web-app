import { Router } from "express";
import { getBookmark, postBookmark } from "../controllers/bookmarks.js";
import { authToken } from "../utils/middlewares.js";
const router = Router();

router.get("/bookmarks/:id", getBookmark);
router.post("/bookmarks", authToken, postBookmark);

export default router;
