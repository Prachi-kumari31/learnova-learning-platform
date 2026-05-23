import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  resourceType: { 
    type: String, 
    enum: ['Video', 'Notes (PDF)', 'Q&A', 'Important Questions'] 
  },
  title: { type: String, required: true },
  description: String,
  fileUrl: String,
  isFree: { type: Boolean, default: false }, // ADDED THIS
  createdAt: { type: Date, default: Date.now }
});

const Content = mongoose.model("Content", ContentSchema);
export default Content;