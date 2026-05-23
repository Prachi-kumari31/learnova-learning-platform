import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class"
  }
});

export default mongoose.model("Subject", subjectSchema);