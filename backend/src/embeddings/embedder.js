/**
 * embedder.js
 * -------------------------------
 * Handles text embedding generation using HuggingFace Sentence Transformers.
 * This module exports a single `getEmbeddings()` function you can use
 * anywhere in your backend (like for document ingestion or updates).
 */

import { getSingleEmbedding } from "./local";

// import { HuggingFaceEmbeddings } from "langchain/embeddings/hf.js";

// // Initialize the embedding model once
// const embeddings = new HuggingFaceEmbeddings({
//   modelName: "sentence-transformers/all-MiniLM-L6-v2", // ✅ 100% free model
// });

// /**
//  * Generate embeddings for an array of texts.
//  * @param {string[]} texts - Array of strings to embed.
//  * @returns {Promise<number[][]>} Array of embedding vectors.
//  */
// export async function getEmbeddings(texts) {
//   if (!Array.isArray(texts)) {
//     throw new Error("❌ getEmbeddings() expects an array of texts");
//   }
//   return await embeddings.embedDocuments(texts);
// }

// /**
//  * Generate embedding for a single text string.
//  * @param {string} text - Text to embed.
//  * @returns {Promise<number[]>} Single embedding vector.
//  */
// export async function getSingleEmbedding(text) {
//   if (!text || typeof text !== "string") {
//     throw new Error("❌ getSingleEmbedding() expects a text string");
//   }
//   return await embeddings.embedQuery(text);
// }

// // Export the raw embeddings instance if needed elsewhere
// export { embeddings };



// import { HuggingFaceEmbeddings } from "langchain/embeddings/hf.js";

// // ✅ Initialize the embedding model once
// const embeddings = new HuggingFaceEmbeddings({
//   modelName: "sentence-transformers/all-MiniLM-L6-v2", // Free model
// });

// /**
//  * Generate embeddings for multiple texts
//  */
// export async function getEmbeddings(texts) {
//   if (!Array.isArray(texts)) throw new Error("getEmbeddings expects an array");
//   return await embeddings.embedDocuments(texts);
// }

// /**
//  * Generate a single embedding
//  */
// export async function getSingleEmbedding(text) {
//   if (typeof text !== "string" || !text)
//     throw new Error("getSingleEmbedding expects a text string");
//   return await embeddings.embedQuery(text);
// }

// export { embeddings };


// ---------- EMBEDDINGS (Local Fallback) ----------
// Import your local embeddings module (adjust path if needed)

// Custom wrapper to mimic LangChain's embedQuery for AstraDBVectorStore
class LocalEmbeddings {
  async embedQuery(text) {
    return await getSingleEmbedding(text);
  }
  async embedDocuments(texts) {
    // Not needed for retrieval, but implement if you add ingestion later
    return await Promise.all(texts.map(t => this.embedQuery(t)));
  }
}

const embeddings = new LocalEmbeddings();  // ✅ Use local—no API, no blob errors

// ---------- Astra DB Retrieval (with better error handling) ----------
let context = "";
try {
  const vectorStore = new AstraDBVectorStore(embeddings, {
    token: process.env.ASTRA_DB_TOKEN,
    endpoint: process.env.ASTRA_DB_ENDPOINT,
    collection: process.env.ASTRA_DB_COLLECTION,
    namespace: process.env.ASTRA_DB_NAMESPACE,
  });

  const retriever = vectorStore.asRetriever();
  const docs = await retriever.getRelevantDocuments(query);
  context = docs.map((d) => d.pageContent).join("\n");
  console.log(`✅ Retrieved ${docs.length} docs from Astra DB`);
} catch (err) {
  console.warn("⚠️ Astra DB retrieval failed:", err.message);
  // Optional: Fallback to empty context or web-only
  if (err.message.includes("blob")) {
    console.log("🔄 Switched to web-only mode due to embedding issue");
  }
}