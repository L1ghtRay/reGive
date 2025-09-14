import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "item", required: true },
  recommendedItemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Recommendation = mongoose.model("Recommendation", recommendationSchema, "recommendations");
export default Recommendation;
