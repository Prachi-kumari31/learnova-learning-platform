import express from "express";
const router = express.Router();
import Subject from "../models/Subject.js"; // .js extension zaroori hai

router.get("/:classId", async (req, res) => {
  try {
    const subjects = await Subject.find({
      classId: req.params.classId
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;