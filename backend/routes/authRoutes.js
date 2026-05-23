import express from "express";
import User from "../models/User.js";
import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// --- EXISTING REGISTER LOGIC (NO CHANGES) ---
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, mobile, password, role, city, state, subject, experience } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "teacher") {
            const existTeacher = await Teacher.findOne({ email });
            if (existTeacher) return res.status(400).json("Teacher already exists");
            const teacher = new Teacher({
                fullName, email, mobile, password: hashedPassword, subject, experience, role: "teacher"
            });
            await teacher.save();
            return res.json("Teacher Registered Successfully");
        } else {
            const existUser = await User.findOne({ email });
            if (existUser) return res.status(400).json("User already exists");
            const user = new User({
                fullName, email, mobile, password: hashedPassword, city, state, role: "student"
            });
            await user.save();
            return res.json("Student Registered Successfully");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Registration Failed");
    }
});

// --- EXISTING LOGIN LOGIC (NO CHANGES) ---
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Teacher.findOne({ email }).select("+password");
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(400).json("Wrong Password");
            const token = jwt.sign({ id: user._id, role: "teacher" }, "secret123", { expiresIn: "7d" });
            return res.json({
                message: "Teacher Login Success", token,
                user: { id: user._id, fullName: user.fullName, email: user.email, role: "teacher" }
            });
        }
        user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json("User not found");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json("Wrong Password");
        const token = jwt.sign({ id: user._id, role: "student" }, "secret123", { expiresIn: "7d" });
        res.json({
            message: "Student Login Success", token,
            user: { id: user._id, fullName: user.fullName, email: user.email, role: "student" }
        });
    } catch (err) {
        res.status(500).json("Server Error");
    }
});

// ⭐ NEW: GET PROFILE DATA
router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("User not found");
        res.json(user);
    } catch (err) {
        res.status(500).json("Error fetching profile");
    }
});

// ⭐ NEW: UPDATE PROFILE DATA
router.put("/update-profile/:id", async (req, res) => {
    try {
        const { fullName, mobile, city, state } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { fullName, mobile, city, state } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json("Update Failed");
    }
});

// ⭐ NEW: CHANGE PASSWORD
router.put("/change-password/:id", async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.params.id).select("+password");
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json("Old password is wrong");

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json("Password changed successfully");
    } catch (err) {
        res.status(500).json("Error changing password");
    }
});

export default router;