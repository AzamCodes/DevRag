// src/scripts/initAstraCollection.js
import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_ENDPOINT, {
  namespace: process.env.ASTRA_DB_NAMESPACE,
});

const collectionName = process.env.ASTRA_DB_COLLECTION;

const run = async () => {
  await db.createCollection(collectionName, {
    vector: { dimension: 512, metric: "cosine" },
  });
  console.log(`✅ Collection '${collectionName}' initialized`);
};

run().catch(console.error);
