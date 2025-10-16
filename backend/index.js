import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./src/routes/chat.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ------------------------------------
// Define __dirname for ES Modules
// ------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------
// Load environment variables
// ------------------------------------
const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("✅ Loaded local .env file");
} else {
  console.log("⚙️ Using Render environment variables");
}

// ------------------------------------
// Log only in development mode (optional)
// ------------------------------------
if (process.env.NODE_ENV !== "production") {
  console.log("🌍 Environment check:");
  console.log("ASTRA_DB_ENDPOINT:", process.env.ASTRA_DB_ENDPOINT);
  console.log("ASTRA_DB_COLLECTION:", process.env.ASTRA_DB_COLLECTION);
  console.log("NEXT_PUBLIC_API:", process.env.NEXT_PUBLIC_API);
  console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);
  console.log("HF_API_KEY:", process.env.HF_API_KEY);
}

// ------------------------------------
// Express App Setup
// ------------------------------------
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRouter);

// ------------------------------------
// Start Server
// ------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
