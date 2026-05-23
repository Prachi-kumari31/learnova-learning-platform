import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  chapter: { type: String, required: true },
  type: { type: String }, // e.g., "video", "pdf"
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  description: { type: String },
  isFree: { type: Boolean, default: false }, // Default paid rahega
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Resource", resourceSchema);