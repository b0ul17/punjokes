"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabase_js_1 = require("@supabase/supabase-js");
const node_cron_1 = __importDefault(require("node-cron"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
let dailyJoke = null;
const supabaseUrl = (_a = process.env.SUPABASE_URL) !== null && _a !== void 0 ? _a : '';
const supabaseKey = (_b = process.env.SUPABASE_KEY) !== null && _b !== void 0 ? _b : '';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
function fetchRandomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        let { data } = yield supabase.rpc('get_random_joke');
        dailyJoke = data[0];
    });
}
// Rate limiter middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // Max 60 requests per minute
});
// Apply the rate limiter middleware to all routes
app.use(limiter);
// Endpoint to get today's joke
app.get("/", (req, res) => {
    if (!dailyJoke) {
        // If dailyJoke is not set, fetch joke
        fetchRandomJoke();
    }
    res.json(dailyJoke);
});
// Schedule a job to get a new joke every day at 12:00 AM
node_cron_1.default.schedule("0 0 * * *", fetchRandomJoke);
fetchRandomJoke();
exports.default = app;
//# sourceMappingURL=app.js.map