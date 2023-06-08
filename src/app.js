const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const app = express();

// let jokes = [];

// // Read jokes from JSON file
// function readJokesFromFile() {
//   try {
//     const fileContents = fs.readFileSync("./src/punjokes.json", "utf8");
//     const jsonData = JSON.parse(fileContents);
//     jokes = jsonData.jokes;
//   } catch (err) {
//     console.error("Error reading jokes file:", err);
//   }
// }

// Jokes array
const jokes = [
  "Why don’t scientists trust atoms? Because they make up everything!",
  "Did you hear about the mathematician who’s afraid of negative numbers? He will stop at nothing to avoid them.",
  "How do you organize a space party? You planet!",
  "I used to be a baker, but I couldn’t make enough dough.",
  "Why don’t skeletons fight each other? They don’t have the guts!",
];

// Get a random joke
function getRandomJoke() {
  const index = Math.floor(Math.random() * jokes.length);
  return jokes[index];
}

// // Get a random joke
// function getRandomJoke() {
//   const index = Math.floor(Math.random() * jokes.length);
//   return jokes[index];
// }

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Max 60 requests per minute
});

// Apply the rate limiter middleware to all routes
app.use(limiter);

// Endpoint to get today's joke
app.get("/", (req, res) => {
  const joke = getRandomJoke();
  res.json({ joke });
});

// Schedule a job to get a new joke every day at 12:00 AM
cron.schedule("0 0 * * *", () => {
  const joke = getRandomJoke();
  console.log("Today's joke:", joke);
});

// readJokesFromFile();

module.exports = app;
