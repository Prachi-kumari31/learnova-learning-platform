import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

// ✅ Create Test (Teacher) - Fixed for dynamic question count
router.post("/create", async (req, res) => {
  try {
    const { title, className, subject, questions, teacherId } = req.body;

    // Validation: Check karein ki questions array khali to nahi hai
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ 
        message: "Test must have at least one question." 
      });
    }

    // Naya test object banayein (Ab ye 1 se lekar 50 jitne bhi questions ho, accept karega)
    const newTest = new Test({ 
      title, 
      className, 
      subject, 
      questions, 
      teacherId 
    });

    await newTest.save();
    res.status(201).json({ message: "Test created successfully", testId: newTest._id });
  } catch (err) {
    console.error("Error creating test:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/student", async (req, res) => {
  try {
    const { className, subject } = req.query;

    let query = {};

    // ✅ FIXED: flexible class matching
    if (className) {
      const classNumber = className.replace(/\D/g, "");

      query.className = {
        $regex: classNumber,
        $options: "i"
      };
    }

    // subject optional
    if (subject && subject !== "") {
      query.subject = subject;
    }

    const tests = await Test.find(query).sort({ createdAt: -1 });

    res.json(tests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Single Test (Test dene ke liye details fetch karna)
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: "Invalid Test ID or Server Error" });
  }
});

export default router;