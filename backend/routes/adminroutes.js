import express from "express";
import { verifyToken } from "../middleware/verify.js";
import { requireAdmin } from "../middleware/adminVerify.js";
import {
  FetchUsers,
  FetchItems,
  FetchTransactions,
  FetchReports,
  DeleteItems,
  DeleteUsers,
} from "../controllers/admincontroller.js";
const router = express.Router();

router.get("/users", FetchUsers);
router.delete("/users/:id", DeleteUsers); //router.get("/users", verifyToken, requireAdmin, FetchUsers); removed authentication for testing
router.get("/items", FetchItems);
router.delete("/items/:id", DeleteItems);
router.get("/transactions", FetchTransactions);
router.get("/reports", FetchReports);

export default router;
