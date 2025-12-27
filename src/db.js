import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jokes = JSON.parse(readFileSync(join(__dirname, "jokes.json"), "utf-8"));

function getAllJokes() {
  return jokes;
}

function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

function getJokeCount() {
  return jokes.length;
}

export { getAllJokes, getRandomJoke, getJokeCount };
