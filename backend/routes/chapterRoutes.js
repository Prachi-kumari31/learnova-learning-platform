import express from "express"; // change require to import
const router = express.Router();
import Content from "../models/Content.js"; // change require to import and add .js extension

// Get chapters based on class and subject
router.get("/:className/:subject", async (req, res) => {
  try {
    const { className, subject } = req.params;

    // Database se distinct chapters nikalna
    const chapters = await Content.distinct("chapter", {
      className,
      subject
    });

    // Isko objects ki array mein convert karna frontend ke liye
    const chapterObjects = chapters.map((ch) => ({
      name: ch
    }));

    res.json(chapterObjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ⭐ YE SABSE IMPORTANT HAI: Default export use karein
export default router;