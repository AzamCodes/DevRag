


// import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import { ChatGroq } from "@langchain/groq";
// import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

// const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: process.env.HF_API_KEY, // optional for free models
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

// const llm = new ChatGroq({
//   model: "mixtral-8x7b",
//   apiKey: process.env.GROQ_API_KEY,
// });

// const search = new DuckDuckGoSearch();

// export async function runRAGQuery(query) {
//   // 🔎 Fetch live web data
//   const webResults = await search.call(query);

//   // 🗃️ Connect to Astra Vector Store
//   const vectorStore = await AstraDBVectorStore.fromExistingCollection(embeddings, {
//     token: process.env.ASTRA_DB_TOKEN,
//     endpoint: process.env.ASTRA_DB_ENDPOINT,
//     collection: process.env.ASTRA_DB_COLLECTION,
//     namespace: process.env.ASTRA_DB_NAMESPACE,
//   });

//   const retriever = vectorStore.asRetriever();
//   const docs = await retriever.getRelevantDocuments(query);
//   const context = docs.map((d) => d.pageContent).join("\n");

//   // 🧠 Combine knowledge + real-time data
//   const fullContext = `${context}\n\nRecent info:\n${webResults}`;

//   const prompt = `
//   Use the context below to answer the user's question accurately.
//   If the information is not found, respond with what you know.

//   Context:
//   ${fullContext}

//   Question:
//   ${query}
//   `;

//   const response = await llm.invoke(prompt);
//   return response.content;
// }


// import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import { ChatGroq } from "@langchain/groq";
// import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // Define __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables
// const result = dotenv.config({ path: path.resolve(__dirname, "../../.env") });
// if (result.error) {
//   console.error("❌ Error loading .env file in ragService.js:", result.error);
//   process.exit(1);
// }

// // Log environment variables for debugging
// console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);
// console.log("HF_API_KEY:", process.env.HF_API_KEY);
// if (!process.env.GROQ_API_KEY) {
//   console.error("❌ GROQ_API_KEY is not set. Please check your .env file.");
//   process.exit(1); // Exit if the key is not set
// }

// if (!process.env.HF_API_KEY) {
//   console.error("❌ HF_API_KEY is not set. Please check your .env file.");
//   process.exit(1); // Exit if the key is not set
// }

// // Initialize embeddings for HuggingFace models
// const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: process.env.HF_API_KEY, // optional for free models
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

// // Initialize the Groq model with the API Key from .env
// const llm = new ChatGroq({
//   model: "mixtral-8x7b",
//   apiKey: process.env.GROQ_API_KEY,
// });

// // Initialize DuckDuckGo search
// const search = new DuckDuckGoSearch();

// // RAG Query function to combine live web data and local vector store
// export async function runRAGQuery(query) {
//   // 🔎 Fetch live web data
//   const webResults = await search.call(query);

//   // 🗃️ Connect to Astra Vector Store
//   const vectorStore = await AstraDBVectorStore.fromExistingCollection(embeddings, {
//     token: process.env.ASTRA_DB_TOKEN,
//     endpoint: process.env.ASTRA_DB_ENDPOINT,
//     collection: process.env.ASTRA_DB_COLLECTION,
//     namespace: process.env.ASTRA_DB_NAMESPACE,
//   });

//   // Retrieve relevant documents from the vector store
//   const retriever = vectorStore.asRetriever();
//   const docs = await retriever.getRelevantDocuments(query);
//   const context = docs.map((d) => d.pageContent).join("\n");

//   // 🧠 Combine knowledge + real-time data (webResults)
//   const fullContext = `${context}\n\nRecent info:\n${webResults}`;

//   // Prepare the prompt for the LLM
//   const prompt = `
//   Use the context below to answer the user's question accurately.
//   If the information is not found, respond with what you know.

//   Context:
//   ${fullContext}

//   Question:
//   ${query}
//   `;

//   // Get the response from the LLM
//   const response = await llm.invoke(prompt);
//   return response.content;
// }



// import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import { ChatGroq } from "@langchain/groq";
// import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // Define __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables
// const result = dotenv.config({ path: path.resolve(__dirname, "../../.env") });
// if (result.error) {
//   console.error("❌ Error loading .env file in ragService.js:", result.error);
//   process.exit(1);
// }


// const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: process.env.HF_API_KEY, // optional for free public models
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

// const llm = new ChatGroq({
//   model: "llama-3.1-70b-versatile",
//   apiKey: process.env.GROQ_API_KEY,
// });



// const search = new DuckDuckGoSearch();

// export async function runRAGQuery(query) {
//   // 1️⃣ Try DuckDuckGo search, fallback on error
//   let webResults = "";
//   try {
//     webResults = await search.call(query);
//   } catch (err) {
//     console.warn("⚠️ DDG search failed or blocked:", err.message);
//     webResults = ""; // fallback to empty
//   }

//   // 2️⃣ Connect to Astra Vector Store and retrieve docs
//   let context = "";
//   try {
//     // const vectorStore = await AstraDBVectorStore.fromExistingCollection(embeddings, {
//     //   token: process.env.ASTRA_DB_TOKEN,
//     //   endpoint: process.env.ASTRA_DB_ENDPOINT,
//     //   collection: process.env.ASTRA_DB_COLLECTION,
//     //   namespace: process.env.ASTRA_DB_NAMESPACE,
//     // });

//     const vectorStore = new AstraDBVectorStore(embeddings, {
//   token: process.env.ASTRA_DB_TOKEN,
//   endpoint: process.env.ASTRA_DB_ENDPOINT,
//   collection: process.env.ASTRA_DB_COLLECTION,
//   namespace: process.env.ASTRA_DB_NAMESPACE,
// });


//     const retriever = vectorStore.asRetriever();
//     const docs = await retriever.getRelevantDocuments(query);
//     context = docs.map((d) => d.pageContent).join("\n");
//   } catch (err) {
//     console.warn("⚠️ Astra DB retrieval failed:", err.message);
//     context = ""; // fallback to empty
//   }

//   // 3️⃣ Combine context + webResults
//   const fullContext = `${context}\n\nRecent info:\n${webResults}`;

//   // 4️⃣ Generate answer using LLM
//   try {
//     const prompt = `
//     Use the context below to answer the user's question accurately.
//     If the information is not found, respond with what you know.

//     Context:
//     ${fullContext}

//     Question:
//     ${query}
//     `;
//     const response = await llm.invoke(prompt);
//     return response?.content || "Sorry, I could not generate an answer.";
//   } catch (err) {
//     console.error("❌ LLM invocation failed:", err.message);
//     return "Sorry, I could not generate an answer.";
//   }
// }



// // src/services/ragService.js
// import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import { ChatGroq } from "@langchain/groq";
// import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import fetch from "node-fetch";

// async function getWebResults(query) {
//   try {
//     const res = await fetch("https://google.serper.dev/search", {
//       method: "POST",
//       headers: {
//         "X-API-KEY": process.env.SERPER_API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ q: query }),
//     });
//     const data = await res.json();
//     return data.organic?.slice(0, 3).map(r => r.snippet).join("\n") || "";
//   } catch (err) {
//     console.error("❌ Serper search failed:", err.message);
//     return "";
//   }
// }


// // ---------- SETUP ----------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load env variables
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// // ---------- EMBEDDINGS ----------
// const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: process.env.HF_API_KEY, // can be skipped for free models
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

// // ---------- LLM (Groq) ----------
// const llm = new ChatGroq({
//   model: "llama-3.1-70b-versatile",
//   apiKey: process.env.GROQ_API_KEY,
// });


// // ---------- Web Search ----------
// const search = new DuckDuckGoSearch();

// // ---------- MAIN FUNCTION ----------
// export async function runRAGQuery(query) {
//   console.log("💬 Incoming query:", query);

//   // 1️⃣ DuckDuckGo Search (for recent data)
//   let webResults = "";
//   try {
//     // webResults = await search.call(query);
//     webResults = await getWebResults(query);
//     console.log("✅ Web results fetched");
//   } catch (err) {
//     console.warn("⚠️ DDG search failed:", err.message);
//   }

//   // 2️⃣ Astra DB Retrieval
//   let context = "";
//   try {
//     // ✅ Use proper constructor (fromExistingCollection deprecated)
//     const vectorStore = new AstraDBVectorStore(embeddings, {
//       token: process.env.ASTRA_DB_TOKEN,
//       endpoint: process.env.ASTRA_DB_ENDPOINT,
//       collection: process.env.ASTRA_DB_COLLECTION,
//       namespace: process.env.ASTRA_DB_NAMESPACE,
//     });

//     const retriever = vectorStore.asRetriever();
//     const docs = await retriever.getRelevantDocuments(query);
//     context = docs.map((d) => d.pageContent).join("\n");
//   } catch (err) {
//     console.warn("⚠️ Astra DB retrieval failed:", err.message);
//   }

//   // 3️⃣ Combine results
//   const fullContext = `${context}\n\nRecent web info:\n${webResults}`;

//   // 4️⃣ LLM Generation
//   try {
//     const prompt = `
// You are a helpful AI assistant.
// Use the provided context to answer the question accurately and concisely.
// If the answer is not found, use your general knowledge.

// Context:
// ${fullContext}

// Question:
// ${query}
// `;

//     const response = await llm.invoke(prompt);
//     const answer = response?.content || "Sorry, I could not generate an answer.";
//     console.log("✅ LLM Response:", answer);
//     return answer;
//   } catch (err) {
//     console.error("❌ LLM invocation failed:", err.message);
//     return "Sorry, I could not generate an answer.";
//   }
// }



// src/services/ragService.js
// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import { ChatGroq } from "@langchain/groq";
// import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import fetch from "node-fetch";
// import { getSingleEmbedding } from "../embeddings/local.js"; // your USE embeddings

// // ---------------------- Setup ----------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// // ---------------------- Local Embeddings Wrapper ----------------------
// class LocalEmbeddings {
//   async embedQuery(text) {
//     return await getSingleEmbedding(text);
//   }
//   async embedDocuments(texts) {
//     return await Promise.all(texts.map((t) => this.embedQuery(t)));
//   }
// }

// const embeddings = new LocalEmbeddings();

// // ---------------------- Web Search Helper ----------------------
// async function getWebResults(query) {
//   try {
//     const res = await fetch("https://google.serper.dev/search", {
//       method: "POST",
//       headers: {
//         "X-API-KEY": process.env.SERPER_API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ q: query }),
//     });
//     const data = await res.json();
//     return data.organic?.slice(0, 3).map((r) => r.snippet).join("\n") || "";
//   } catch (err) {
//     console.error("❌ Serper search failed:", err.message);
//     return "";
//   }
// }

// // ---------------------- LLM Setup ----------------------
// const llm = new ChatGroq({
//   model: "llama-3.1-13b", // or another active model
//   apiKey: process.env.GROQ_API_KEY,
// });

// // ---------------------- RAG Query ----------------------
// export async function runRAGQuery(query) {
//   console.log("💬 Incoming query:", query);

//   // 1️⃣ Web results
//   let webResults = "";
//   try {
//     webResults = await getWebResults(query);
//     console.log("✅ Web results fetched");
//   } catch (err) {
//     console.warn("⚠️ Web search failed:", err.message);
//   }

//   // 2️⃣ Astra DB retrieval
//   let context = "";
//   try {
//     const vectorStore = new AstraDBVectorStore(embeddings, {
//       token: process.env.ASTRA_DB_TOKEN,
//       endpoint: process.env.ASTRA_DB_ENDPOINT,
//       collection: process.env.ASTRA_DB_COLLECTION,
//       namespace: process.env.ASTRA_DB_NAMESPACE,
//     });

//     const retriever = vectorStore.asRetriever();
//     const docs = await retriever.getRelevantDocuments(query);
//     context = docs.map((d) => d.pageContent).join("\n");
//     console.log(`✅ Retrieved ${docs.length} docs from Astra DB`);
//   } catch (err) {
//     console.warn("⚠️ Astra DB retrieval failed:", err.message);
//   }

//   // 3️⃣ Combine context + web
//   const fullContext = `${context}\n\nRecent web info:\n${webResults}`;

//   // 4️⃣ LLM generation
//   try {
//     const prompt = `
// You are a helpful AI assistant.
// Use the provided context to answer the question accurately and concisely.
// If the answer is not found, use your general knowledge.

// Context:
// ${fullContext}

// Question:
// ${query}
// `;
//     const response = await llm.invoke(prompt);
//     const answer = response?.content || "Sorry, I could not generate an answer.";
//     console.log("✅ LLM Response:", answer);
//     return answer;
//   } catch (err) {
//     console.error("❌ LLM invocation failed:", err.message);
//     return "Sorry, I could not generate an answer.";
//   }
// }



// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import fetch from "node-fetch";
// import { getSingleEmbedding } from "../embeddings/local.js"; // your USE embeddings

// // ---------------------- Setup ----------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// // ---------------------- Local Embeddings Wrapper ----------------------
// class LocalEmbeddings {
//   async embedQuery(text) {
//     return await getSingleEmbedding(text);
//   }
//   async embedDocuments(texts) {
//     return await Promise.all(texts.map((t) => this.embedQuery(t)));
//   }
// }

// const embeddings = new LocalEmbeddings();

// // ---------------------- Web Search Helper ----------------------
// async function getWebResults(query) {
//   try {
//     const res = await fetch("https://google.serper.dev/search", {
//       method: "POST",
//       headers: {
//         "X-API-KEY": process.env.SERPER_API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ q: query }),
//     });
//     const data = await res.json();
//     return data.organic?.slice(0, 3).map((r) => r.snippet).join("\n") || "";
//   } catch (err) {
//     console.error("❌ Serper search failed:", err.message);
//     return "";
//   }
// }

// // ---------------------- RAG Query ----------------------
// export async function runRAGQuery(query) {
//   console.log("💬 Incoming query:", query);

//   // 1️⃣ Web results
//   let webResults = "";
//   try {
//     webResults = await getWebResults(query);
//     console.log("✅ Web results fetched");
//   } catch (err) {
//     console.warn("⚠️ Web search failed:", err.message);
//   }

//   // 2️⃣ Astra DB retrieval
//   let context = "";
//   try {
//    const vectorStore = new AstraDBVectorStore(embeddings, {
//   token: process.env.ASTRA_DB_TOKEN,
//   endpoint: process.env.ASTRA_DB_ENDPOINT,
//   collection: process.env.ASTRA_DB_COLLECTION,
//   namespace: process.env.ASTRA_DB_NAMESPACE,
// });

// await vectorStore.ensureCollection(); // ✅ Forces connection
// const retriever = vectorStore.asRetriever();
// const docs = await retriever.getRelevantDocuments(query);

//     context = docs.map((d) => d.pageContent).join("\n");
//     console.log(`✅ Retrieved ${docs.length} docs from Astra DB`);
//   } catch (err) {
//     console.warn("⚠️ Astra DB retrieval failed:", err.message);
//   }

//   // 3️⃣ Combine context + web
//   const fullContext = `${context}\n\nRecent web info:\n${webResults}`;

//   // 4️⃣ LLM Generation using OpenRouter free model
//   try {
//     const prompt = `
// You are a helpful AI assistant.
// Use the provided context to answer the question accurately and concisely.
// If the answer is not found, use your general knowledge.

// Context:
// ${fullContext}

// Question:
// ${query}
// `;

//     // OpenRouter API call
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-r1:free", // ✅ Free LLM
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 500,
//       }),
//     });

//     const data = await response.json();
//     const answer = data?.choices?.[0]?.message?.content || "Sorry, I could not generate an answer.";
//     console.log("✅ LLM Response:", answer);
//     return answer;

//   } catch (err) {
//     console.error("❌ LLM invocation failed:", err.message);
//     return "Sorry, I could not generate an answer.";
//   }
// // }


// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import fetch from "node-fetch";
// import { getSingleEmbedding } from "../embeddings/local.js";
// import { DataAPIClient } from "@datastax/astra-db-ts";

// // ---------------------- Setup ----------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// // ---------------------- Local Embeddings Wrapper ----------------------
// class LocalEmbeddings {
//   async embedQuery(text) {
//     return await getSingleEmbedding(text);
//   }
//   async embedDocuments(texts) {
//     return await Promise.all(texts.map((t) => this.embedQuery(t)));
//   }
// }
// const embeddings = new LocalEmbeddings();

// // ---------------------- Web Search Helper ----------------------
// async function getWebResults(query) {
//   try {
//     const res = await fetch("https://google.serper.dev/search", {
//       method: "POST",
//       headers: {
//         "X-API-KEY": process.env.SERPER_API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ q: query }),
//     });
//     const data = await res.json();
//     return data.organic?.slice(0, 3).map((r) => r.snippet).join("\n") || "";
//   } catch (err) {
//     console.error("❌ Serper search failed:", err.message);
//     return "";
//   }
// }

// // ---------------------- RAG Query ----------------------
// export async function runRAGQuery(query) {
//   console.log("💬 Incoming query:", query);

//   // 1️⃣ Web results
//   let webResults = "";
//   try {
//     webResults = await getWebResults(query);
//     console.log("✅ Web results fetched");
//   } catch (err) {
//     console.warn("⚠️ Web search failed:", err.message);
//   }

//   // 2️⃣ Astra DB retrieval
//   let context = "";
//   try {
//     const vectorStore = new AstraDBVectorStore(embeddings, {
//       token: process.env.ASTRA_DB_TOKEN,
//       endpoint: process.env.ASTRA_DB_ENDPOINT,
//       collection: process.env.ASTRA_DB_COLLECTION,
//       namespace: process.env.ASTRA_DB_NAMESPACE,
//     });

//     console.log("🔍 Searching Astra DB for similar vectors...");
//     const retriever = vectorStore.asRetriever({ k: 8 }); // get top 3 docs
//     const docs = await retriever._getRelevantDocuments(query);

//     if (!docs.length) console.warn("⚠️ No relevant documents found in Astra DB");
//     else console.log(`✅ Retrieved ${docs.length} docs from Astra DB`);

//     context = docs.map((d) => d.pageContent).join("\n");
//   } catch (err) {
//     console.warn("⚠️ Astra DB retrieval failed:", err.message);
//   }

//   // 3️⃣ Combine context + web
//   const fullContext = `${context}\n\nRecent web info:\n${webResults}`;

//   // 4️⃣ Generate final answer using OpenRouter LLM
//   try {
//     const prompt = `
// You are a helpful AI assistant.
// Use the provided context to answer the question accurately and concisely.
// If the answer is not found, say "I don’t have enough data to answer that yet."

// Context:
// ${fullContext}

// Question:
// ${query}
// `;

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//      model: "google/gemma-2-9b-it:free", // ✅ Free model from OpenRouter
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 500,
//       }),
//     });

//     const data = await response.json();

//     if (data.error) {
//       console.error("❌ LLM API Error:", data.error);
//       return "Sorry, I could not generate an answer.";
//     }

//     const answer = data?.choices?.[0]?.message?.content || "Sorry, I could not generate an answer.";
//     console.log("✅ LLM Response:", answer);
//     return answer;
//   } catch (err) {
//     console.error("❌ LLM invocation failed:", err.message);
//     return "Sorry, I could not generate an answer.";
//   }
// }
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import { getSingleEmbedding } from "../embeddings/local.js";
import { DataAPIClient } from "@datastax/astra-db-ts";

// ---------------------- Setup ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// ---------------------- Embeddings Wrapper ----------------------
class LocalEmbeddings {
  async embedQuery(text) {
    return await getSingleEmbedding(text); // returns flat array
  }
}
const embeddings = new LocalEmbeddings();

// ---------------------- Astra DB Client ----------------------
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_ENDPOINT, {
  keyspace: process.env.ASTRA_DB_NAMESPACE, // ✅ Use 'keyspace' instead
});

// ---------------------- Web Search Helper ----------------------
async function getWebResults(query) {
  try {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query }),
    });
    const data = await res.json();
    return data.organic?.slice(0, 3).map(r => r.snippet).join("\n") || "";
  } catch (err) {
    console.error("❌ Web search failed:", err.message);
    return "";
  }
}

// ---------------------- Insert Document (optional) ----------------------
async function insertDocument(content, embedding, id) {
  try {
    const collection = await db.collection(process.env.ASTRA_DB_COLLECTION);
    await collection.insert({
      _id: id,
      content,
      embedding, // MUST be float array
    });
    console.log("✅ Document inserted:", id);
  } catch (err) {
    console.error("❌ Error inserting document:", err.message);
  }
}

// ---------------------- Vector Search ----------------------
// async function getRelevantDocsFromAstra(query, topK = 5) {
//   try {
//     const queryEmbedding = await embeddings.embedQuery(query);
//     console.log(`🔍 Query embedding dimension: ${queryEmbedding.length}`);

//     const collection = await db.collection(process.env.ASTRA_DB_COLLECTION);

//     // Safe count
//     let totalCount = 0;
//     try {
//       totalCount = await collection.estimatedDocumentCount?.() ?? await collection.countDocuments?.({}) ?? (await collection.find({}, { limit: 1000 }).toArray()).length;
//     } catch (countErr) {
//       console.warn("⚠️ Count failed, assuming data exists:", countErr.message);
//     }
//     console.log(`📊 Total docs in collection: ${totalCount}`);

//     // Vector find
//     const cursor = collection.find(
//       {},
//       {
//         sort: { $vector: queryEmbedding },
//         limit: topK,
//         includeSimilarity: true,
//         projection: { content: 1, _id: 1 },
//       }
//     );

//     const documents = await cursor.toArray();
//     console.log(`🔍 Retrieved ${documents.length} docs:`, documents.map(d => ({ id: d._id, sim: d.$similarity?.toFixed(4), preview: (d.content || '').substring(0,50) + '...' })));

//     if (!documents.length) {
//       console.warn("⚠️ No relevant documents found in Astra DB");
//       return [];
//     }

//     return documents.map(doc => doc.content || "");
//   } catch (err) {
//     console.error("❌ Error fetching documents from Astra DB:", err.message);
//     // Enhanced fallback: Non-vector find
//     try {
//       const collection = await db.collection(process.env.ASTRA_DB_COLLECTION);
//       const fallbackDocs = await collection.find({}, { limit: topK, projection: { content: 1 } }).toArray();
//       console.log(`🔄 Fallback: Retrieved ${fallbackDocs.length} raw docs`);
//       return fallbackDocs.map(doc => doc.content || "");
//     } catch (fallbackErr) {
//       console.error("❌ Fallback failed:", fallbackErr.message);
//       return [];
//     }
//   }
// }
async function getRelevantDocsFromAstra(query, topK = 5, minSimilarity = 0.0) { // Add minSimilarity param
  try {
    const queryEmbedding = await embeddings.embedQuery(query);
    console.log(`🔍 Query embedding dim: ${queryEmbedding.length}, sample: [${queryEmbedding.slice(0,5)}...]`);

    const collection = await db.collection(process.env.ASTRA_DB_COLLECTION);

    const cursor = collection.find(
      {}, // Or add filter: { $text: { $search: "Azam" } } for hybrid
      // {
      //   sort: { $vector: queryEmbedding },
      //   limit: topK,
      //   includeSimilarity: true,
      //   projection: { content: 1, _id: 1 },
      //   options: { minSimilarity } // v2.0+ threshold (try 0.0 to force returns)
      // }
      {
    sort: { $vector: queryEmbedding },
    limit: topK,
    includeSimilarity: true,
    projection: { content: 1, _id: 1 },
    options: { minSimilarity: 0.0 } // Force all, even low-scorers
  }
    );

    const documents = await cursor.toArray();
    console.log(`🔍 Raw similarities:`, documents.map(d => ({ id: d._id, sim: d.$similarity?.toFixed(4), preview: (d.content || '').substring(0,50) })));

    // Filter post-retrieval if needed
    const relevant = documents.filter(d => (d.$similarity || 0) > 0.5);
    console.log(`🔍 High-sim docs (>0.5): ${relevant.length}`);

    return relevant.map(doc => doc.content || "");
  } catch (err) {
    console.error("❌ Vector error:", err.message);
    // Fallback: Text search
    return await fallbackTextSearch(collection, query, topK);
  }
}

async function fallbackTextSearch(collection, query, topK) {
  // Simple keyword fallback
  const docs = await collection.find({ content: { $regex: query.split(' ')[0], $options: 'i' } }, { limit: topK }).toArray();
  console.log(`🔄 Text fallback: ${docs.length} docs`);
  return docs.map(d => d.content || "");
}
// ---------------------- RAG Query ----------------------
export async function runRAGQuery(query) {
  console.log("💬 Incoming query:", query);

  // 1️⃣ Web results
  let webResults = "";
  try {
    webResults = await getWebResults(query);
    console.log("✅ Web results fetched");
  } catch (err) {
    console.warn("⚠️ Web search failed:", err.message);
  }

  // 2️⃣ Vector search
  let context = "";
  try {
    const docs = await getRelevantDocsFromAstra(query, 5);
    context = docs.join("\n");
    console.log(`✅ Retrieved ${docs.length} docs from Astra DB`);
  } catch (err) {
    console.warn("⚠️ Astra DB retrieval failed:", err.message);
  }

  // 3️⃣ Combine context + web
  const fullContext = `${context}\n\nRecent web info:\n${webResults}`;

  // 4️⃣ LLM response
  try {
//     const prompt = `
// You are a helpful AI assistant.
// Use the provided context to answer the question concisely.
// If the answer is not found, say "I don’t have enough data to answer that yet."

// Context:
// ${fullContext}

// Question:
// ${query}
// `;
const prompt = `
You are a RAG assistant. Answer accurately based only on the context below.
If uncertain, say "I don’t have enough data."

Context:
${fullContext}

Question:
${query}

Format your answer in plain text, concise and factual.
`;


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // model: "google/gemma-2-9b-it:free",
        // model:"google/gemini-2.5-pro-exp-03-25:free",
        // model:"meta-llama/llama-4-maverick:free",
        // model:"deepseek/deepseek-v3-base:free",
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("❌ LLM API Error:", data.error);
      return "Sorry, I could not generate an answer.";
    }

    const answer = data?.choices?.[0]?.message?.content || "I don’t have enough data to answer that yet.";
    console.log("✅ LLM Response:", answer);
    return answer.replace(/[*_~`]/g, "").replace(/\n+/g, " ").trim();
  } catch (err) {
    console.error("❌ LLM invocation failed:", err.message);
    return "Sorry, I could not generate an answer.";
  }
}
