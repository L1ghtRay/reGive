import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  imageURL: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ["available", "unavailable", "reserved"], default: "available" },
  pickup: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
  available_until: { type: Date },
  urgent: { type: Boolean, default: false },
  preferences: { type: [String], default: [] }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema, "items");
export default Item;
