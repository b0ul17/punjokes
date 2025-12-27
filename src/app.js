import express from "express";
import rateLimit from "express-rate-limit";
import { getDailyJoke } from "./db.js";
import "dotenv/config";

const app = express();

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Max 60 requests per minute
});

// Apply the rate limiter middleware to all routes
app.use(limiter);

// Endpoint to get today's joke
app.get("/", (req, res) => {
  res.json({ joke: getDailyJoke() });
});

export default app;
