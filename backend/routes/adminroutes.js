import express from "express";
import { verifyToken } from "../middleware/verify.js";
import { requireAdmin } from "../middleware/adminVerify.js";
import { FetchUsers } from "../controllers/admincontroller.js";
const router = express.Router();

router.get("/users", FetchUsers); //router.get("/users", verifyToken, requireAdmin, FetchUsers); removed authentication for testing

export default router;
