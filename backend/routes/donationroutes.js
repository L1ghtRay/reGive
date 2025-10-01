/*
1. Will have to change the image storing part once we have cloud storage
2. Add authentication middleware 
*/
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { verifyToken } from "../middleware/verify.js";
import { donateItem } from "../controllers/donationcontroller.js";
const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter ,  
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post("/donate", upload.array("images", 5), donateItem);

export default router;
