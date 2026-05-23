import express from "express";
const router = express.Router();
import Content from "../models/Content.js";

/* ================= TEACHER PANEL ================= */

// All content (paid + free)
router.get("/get-content", async (req, res) => {
  try {
    const resources = await Content.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-content/:id", async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Content Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update
router.put("/update-content/:id", async (req, res) => {
  try {
    const { title, description, isFree } = req.body;

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      { title, description, isFree },
      { new: true }
    );

    res.json(updatedContent);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* ================= STUDENT PANEL ================= */

// Free Resources
router.get("/free-resources", async (req, res) => {
  try {

    const resources = await Content.find({ isFree: true })
      .sort({ createdAt: -1 });

    res.json(resources);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Class wise Free Resources
router.get("/free-resources/class/:className", async (req, res) => {

  try {

    const resources = await Content.find({
      className: req.params.className,
      isFree: true
    }).sort({ createdAt: -1 });

    res.json(resources);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// Chapter wise (Subscribed students)
router.get("/chapter/:chapterName", async (req, res) => {

  try {

    const resources = await Content.find({
      chapter: req.params.chapterName
    });

    res.json(resources);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

export default router;