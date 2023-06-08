const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const app = express();

let dailyJoke = null;

let jokes = [];

// Read jokes from JSON file
function readJokesFromFile() {
  try {
    const jsonData = require("./punjokes.json");
    jokes = jsonData.jokes;
  } catch (err) {
    console.error("Error reading jokes file:", err);
  }
}

// Get a random joke
function getRandomJoke() {
  const index = Math.floor(Math.random() * jokes.length);
  return jokes[index];
}

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

readJokesFromFile();

module.exports = app;
