import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  className: String,
  subject: String,
  name: String
});

export default mongoose.model("Chapter", chapterSchema);