import express from "express";
import { createSubscription } from "../controllers/subscriptionController.js";
import { checkSubscription } from "../middleware/subscriptionMiddleware.js"; // Import middleware
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createSubscription);

// 🌐 ADD THIS LINE: Endpoint jo frontend tab click hone par user ke criteria verify karega
router.get("/check", authMiddleware, checkSubscription(), (req, res) => {
    // Agar checkSubscription middleware next() call karta hai, matlab access valid hai!
    res.status(200).json({ status: "success", accessAllowed: true });
});

export default router;