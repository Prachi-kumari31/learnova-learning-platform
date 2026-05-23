import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number // index (0-3)
});

const testSchema = new mongoose.Schema({
  title: String,
  className: String,
  subject: String,
  teacherId: String,

  questions: [questionSchema], // 20 questions

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Test", testSchema);