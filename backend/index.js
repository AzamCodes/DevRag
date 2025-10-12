import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./src/routes/chat.js";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const result = dotenv.config({ path: path.resolve(__dirname, ".env") });
if (result.error) {
  console.error("❌ Error loading .env file:", result.error);
  process.exit(1);
}
console.log("✅ .env file loaded successfully");
// Log environment variables to check if they are being loaded
console.log('ASTRA_DB_ENDPOINT:', process.env.ASTRA_DB_ENDPOINT);
console.log('ASTRA_DB_COLLECTION:', process.env.ASTRA_DB_COLLECTION);
console.log('NEXT_PUBLIC_API:', process.env.NEXT_PUBLIC_API);
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY);
console.log('HF_API_KEY:', process.env.HF_API_KEY);
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log("🚀 Server running on port", process.env.PORT || 5000)
);
