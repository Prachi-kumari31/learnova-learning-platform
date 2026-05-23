import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {
    const { className, price } = req.body;
    const userId = req.user.id; // From authMiddleware

    // Check if subscription already exists to avoid redundant rows
    let existingSub = await Subscription.findOne({ userId, className });

    // Setting date offset target to exactly +2 Years from current system clock
    const targetExpiration = new Date();
    targetExpiration.setFullYear(targetExpiration.getFullYear() + 2);

    if (existingSub) {
      existingSub.validTill = targetExpiration;
      existingSub.paymentStatus = "Completed";
      await existingSub.save();
      
      return res.status(200).json({
        message: "Subscription Updated successfully 🎉",
        subscription: existingSub
      });
    }

    // Creating fresh structural subscription mapping
    const newSubscription = new Subscription({
      userId,
      className,
      price,
      paymentStatus: "Completed",
      validTill: targetExpiration // ✅ Critical Fix: Strict date boundary parsed
    });

    await newSubscription.save();

    res.status(201).json({
      message: "Subscription Activated successfully 🎉",
      subscription: newSubscription
    });

  } catch (error) {
    console.error("Subscription Creation Controller Error:", error);
    res.status(500).json({ message: "Internal Server Processing Error" });
  }
};