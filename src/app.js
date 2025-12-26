import express from "express";
import cron from "node-cron";
import rateLimit from "express-rate-limit";
import { getRandomJoke } from "./db.js";
import "dotenv/config";

const app = express();

let dailyJoke = null;

function setDailyJoke() {
  dailyJoke = getRandomJoke();
}

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Max 60 requests per minute
});

// Apply the rate limiter middleware to all routes
app.use(limiter);

// Endpoint to get today's joke
app.get("/", (req, res) => {
  if (!dailyJoke) {
    // If dailyJoke is not set, set it to a new joke
    setDailyJoke();
  }
  res.json({ joke: dailyJoke });
});

// Schedule a job to get a new joke every day at 12:00 AM
cron.schedule("0 0 * * *", setDailyJoke);

export default app;
