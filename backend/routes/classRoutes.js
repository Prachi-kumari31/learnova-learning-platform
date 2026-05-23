import express from "express";
const router = express.Router();
import Class from "../models/Class.js"; // .js extension zaroori hai

router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;