import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./src/routes/chat.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env only if it exists (local development)
const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("✅ Loaded local .env file");
} else {
  console.log("⚙️ Using environment variables from Render");
}

// Log environment variables
console.log("ASTRA_DB_ENDPOINT:", process.env.ASTRA_DB_ENDPOINT);
console.log("ASTRA_DB_COLLECTION:", process.env.ASTRA_DB_COLLECTION);
console.log("NEXT_PUBLIC_API:", process.env.NEXT_PUBLIC_API);
console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);
console.log("HF_API_KEY:", process.env.HF_API_KEY);

const app = express();

// ✅ FIX CORS HERE
const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "https://devrag.vercel.app", // your deployed frontend
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/chat", chatRouter);

// Start server
app.listen(process.env.PORT || 5000, () =>
  console.log("🚀 Server running on port", process.env.PORT || 5000)
);
