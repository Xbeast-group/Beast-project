import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalText: { type: String, required: true },
    bullets: { type: Array, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Summary || mongoose.model("Summary", SummarySchema);