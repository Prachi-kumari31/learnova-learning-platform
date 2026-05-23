import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

/* ================= MODELS ================= */
// Humne "Content" ko hi main model mana hai jo paid/free dono handle karega
import Content from "./models/Content.js"; 
import User from "./models/User.js";

/* ================= ROUTES ================= */
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import testRoutes from "./routes/testRoutes.js";

/* ================= APP INIT ================= */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= EMAIL SETUP & PASSWORD RESET (Keep as is) ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
const otpStore = new Map();

app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore.set(email, { otp, expires: Date.now() + 600000 });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP is ${otp}`
    });
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json("Error sending email");
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const entry = otpStore.get(email);
  if (!entry || entry.otp !== parseInt(otp) || Date.now() > entry.expires) {
    return res.status(400).json("Invalid or expired OTP");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  otpStore.delete(email);
  res.json({ message: "Password reset successful" });
});

/* ================= MULTER SETUP ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.resourceType || "Others";
    let folder = "uploads/others";
    if (type === "Video") {
      folder = "uploads/videos";
    } else if (type.includes("PDF") || type.includes("Notes")) {
      folder = "uploads/pdfs";
    }
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* ================= UNIFIED UPLOAD LOGIC ================= */
app.post("/api/upload-resource", upload.single("file"), async (req, res) => {
  try {
    const { className, subject, chapter, resourceType, title, description, isFree } = req.body;

    // File path handle karein
    const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    if (!filePath) {
      return res.status(400).json({ message: "File upload failed on server" });
    }

    const newContent = new Content({
      className,
      subject,
      chapter,
      resourceType,
      title,
      description,
      fileUrl: filePath,
      isFree: isFree === "true" // String "true" ko boolean true banayega
    });

    await newContent.save();
    res.status(200).json({ message: "Content uploaded successfully!" });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Database Error: " + err.message });
  }
});


/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/chapters", chapterRoutes);


// Routes linking
app.use("/api/resources", resourceRoutes); 
app.use("/api/tests", testRoutes);

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});