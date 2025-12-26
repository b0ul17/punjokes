import Database from "better-sqlite3";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export { db, getAllJokes, getRandomJoke, getJokeCount };
