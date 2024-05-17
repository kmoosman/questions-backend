import rateLimit from "express-rate-limit";
export const collectionSessionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    if (req.rateLimit.used === req.rateLimit.limit + 1) {
      console.log("Rate limit exceeded");
    }
    return res
      .status(429)
      .send("Too many requests. Please wait before trying again.");
  },
});
