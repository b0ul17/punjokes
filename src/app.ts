import express, {Request, Response} from 'express';
import {createClient} from '@supabase/supabase-js';
import cron from "node-cron";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const app = express();

let dailyJoke :object | null = null;

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseKey =  process.env.SUPABASE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)



async function fetchRandomJoke(){
  let { data } = await supabase.rpc('get_random_joke');
  dailyJoke = data[0];

}

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Max 60 requests per minute
});

// Apply the rate limiter middleware to all routes
app.use(limiter);

// Endpoint to get today's joke
app.get("/", (req: Request, res: Response) => {
  if (!dailyJoke) {
    // If dailyJoke is not set, fetch joke
    fetchRandomJoke();
  }
  res.json(dailyJoke );
});

// Schedule a job to get a new joke every day at 12:00 AM
cron.schedule("0 0 * * *", fetchRandomJoke);

fetchRandomJoke();

export default app;
