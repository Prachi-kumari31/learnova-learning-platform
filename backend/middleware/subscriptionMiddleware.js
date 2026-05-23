import Subscription from "../models/Subscription.js";

export const checkSubscription = () => {
  return async (req, res, next) => {
    try {
      // ✅ Dynamic Parameter Fix: If passing from router URL path parameter context mapping
      // It handles either explicit route declaration OR custom request header payloads
      const className = req.params.className || req.body.className || req.query.className;

      if (!className) {
        return res.status(400).json({
          message: "Bad Request: Target Class identification parameter missing."
        });
      }

      const subscription = await Subscription.findOne({
        userId: req.user.id,
        className: className
      });

      // Verification Step 1: Entry Check
      if (!subscription) {
        return res.status(403).json({
          message: "Access Denied: Please purchase a subscription plan first."
        });
      }

      // Verification Step 2: Timestamp Check with absolute fallback parameters safety
      const expirationDate = subscription.validTill ? new Date(subscription.validTill) : null;
      
      if (!expirationDate || expirationDate < new Date()) {
        return res.status(403).json({
          message: "Access Expired: Your plan validity has expired."
        });
      }

      // Payload valid, shifting pointer workflow control matrix to next view execution
      next();

    } catch (error) {
      console.log("Subscription Middleware Authentication Interruption Log:", error);
      res.status(500).json({
        message: "Internal Validation Stack Server Error"
      });
    }
  };
};