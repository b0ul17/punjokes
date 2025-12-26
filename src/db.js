const Database = require("better-sqlite3");
const crypto = require("crypto");
const path = require("path");

const dbPath = path.join(__dirname, "punjokes.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS jokes (
    id TEXT PRIMARY KEY,
    setup TEXT NOT NULL,
    punchline TEXT NOT NULL
  )
`);

function generateUUID() {
  return crypto.randomUUID();
}

function getAllJokes() {
  return db.prepare("SELECT * FROM jokes").all();
}

function getRandomJoke() {
  return db.prepare("SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1").get();
}

function getJokeCount() {
  return db.prepare("SELECT COUNT(*) as count FROM jokes").get().count;
}

module.exports = {
  db,
  getAllJokes,
  getRandomJoke,
  getJokeCount,
};
