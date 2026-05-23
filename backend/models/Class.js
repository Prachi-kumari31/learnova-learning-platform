import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className: String
});

export default mongoose.model("Class", classSchema);