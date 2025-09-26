import express from "express";
import { verifyToken } from "../middleware/verify.js";
import { requireAdmin } from "../middleware/adminVerify.js";
import {
  FetchUsers,
  FetchItems,
  FetchTransactions,
  FetchReports,
} from "../controllers/admincontroller.js";
const router = express.Router();

router.get("/users", FetchUsers); //router.get("/users", verifyToken, requireAdmin, FetchUsers); removed authentication for testing
router.get("/items", FetchItems);
router.get("/transactions", FetchTransactions);
router.get("/reports", FetchReports);

export default router;
