const express = require("express");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 4000;

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: "Too many requests, please try again later."
});

let jsonData = null;

// Read the file during server startup
fs.readFile("./punjokes.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  jsonData = JSON.parse(data);
});


// Define the endpoint
app.get("/", apiLimiter, async (req, res) => {
  if (!jsonData) {
    res.status(500).send("Internal Server Error");
    return;
  }

  // Send the JSON data as the response
  res.json(jsonData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
