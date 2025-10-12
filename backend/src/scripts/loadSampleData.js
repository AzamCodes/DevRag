
// // src/services/ragService.js
// import { DataAPIClient } from "@datastax/astra-db-ts";
// import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
// import dotenv from "dotenv";
// import path from "path";
// import * as use from "@tensorflow-models/universal-sentence-encoder";
// import * as tf from "@tensorflow/tfjs-node";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// // ---------------- Embeddings ----------------
// let useModel;
// async function getSingleEmbedding(text) {
//   if (!useModel) useModel = await use.load();
//   const embeddings = await useModel.embed([text]);
//   const array = await embeddings.array();
//   return array[0];
// }

// class LocalEmbeddings {
//   async embedQuery(text) {
//     return await getSingleEmbedding(text);
//   }
//   async embedDocuments(texts) {
//     return await Promise.all(texts.map((t) => this.embedQuery(t)));
//   }
// }
// const embeddings = new LocalEmbeddings();

// // ---------------- RAG Logic ----------------
// // export async function runRAG(userQuery, llm) {
// //   try {
// //     console.log("💬 Incoming query:", userQuery);

// //     const db = new DataAPIClient(process.env.ASTRA_DB_TOKEN).db(
// //       process.env.ASTRA_DB_ENDPOINT,
// //       { namespace: process.env.ASTRA_DB_NAMESPACE }
// //     );

// //     // ✅ FIX: Proper connection to existing collection
// //     // const vectorStore = new AstraDBVectorStore(embeddings, {
// //     //   token: process.env.ASTRA_DB_TOKEN,
// //     //   endpoint: process.env.ASTRA_DB_ENDPOINT,
// //     //   collection: process.env.ASTRA_DB_COLLECTION,
// //     //   namespace: process.env.ASTRA_DB_NAMESPACE,
// //     // });
// //     const vectorStore = new AstraDBVectorStore(embeddings, {
// //   token: process.env.ASTRA_DB_TOKEN,
// //   endpoint: process.env.ASTRA_DB_ENDPOINT,
// //   collection: process.env.ASTRA_DB_COLLECTION,
// //   namespace: process.env.ASTRA_DB_NAMESPACE,
// // });





// //     // ✅ Embed query and search similar vectors
// //     console.log("🔍 Searching Astra DB for similar vectors...");
// //     const queryEmbedding = await embeddings.embedQuery(userQuery);

// //     const results = await db
// //       .collection(process.env.ASTRA_DB_COLLECTION)
// //       .find({}, { limit: 5 });

// //     // Instead of random docs, use the VectorStore retriever
// //     const retriever = vectorStore.asRetriever(3);
// //     const docs = await retriever.invoke(userQuery);

// //     if (!docs?.length) {
// //       console.warn("⚠️ No matching context found in Astra DB");
// //       return "Sorry, I couldn’t find relevant information for that query.";
// //     }

// //     const context = docs.map((d) => d.pageContent || d.content).join("\n\n");

// //     // ---------------- Call LLM ----------------
// //     console.log("🧩 Passing retrieved context to LLM...");
// // const prompt = `
// // You are a knowledgeable assistant. Answer the following question using the provided context.
// // - Only provide **plain text**, no bullets, no Markdown, no special formatting.
// // - Be concise and human-friendly, as if talking directly to a user.
// // - If the answer is not in the context, say "I don't know."

// // Context:
// // ${context}

// // Question:
// // ${userQuery}
// // `;

// //     const response = await llm.invoke(prompt);
// //     console.log("✅ RAG LLM Response:", response);
// //     return response;
// //   } catch (err) {
// //     console.error("❌ RAG error:", err.message);
// //     return "Sorry, I couldn’t generate an answer due to an internal error.";
// //   }
// // }

// export async function runRAGQuery(userQuery) {
//   console.log("💬 Incoming query:", userQuery);

//   let context = "";

//   try {
//     const vectorStore = new AstraDBVectorStore(embeddings, {
//       token: process.env.ASTRA_DB_TOKEN,
//       endpoint: process.env.ASTRA_DB_ENDPOINT,
//       collection: process.env.ASTRA_DB_COLLECTION,
//       namespace: process.env.ASTRA_DB_NAMESPACE,
//     });

//     const retriever = vectorStore.asRetriever({ k: 8 }); // fetch top 8 relevant chunks
//     const docs = await retriever.getRelevantDocuments(userQuery);
//     context = docs.map(d => d.pageContent).join("\n");
//     console.log(`✅ Retrieved ${docs.length} docs from Astra DB`);
//     console.log("🔹 Sample context:", context.slice(0, 300), "...");
//   } catch (err) {
//     console.warn("⚠️ Astra DB retrieval failed:", err.message);
//   }

//   const prompt = `
// You are a knowledgeable assistant. Answer the question using the context.
// - Only provide plain text, no bullets or formatting.
// - Be concise and friendly, as if talking to a user.
// - If the answer is not in the context, say "I don't know."

// Context:
// ${context}

// Question:
// ${userQuery}
// `;

//   try {
//     const response = await llm.invoke(prompt);
//     let answer = response?.content || "I don't know.";

//     // Optional: clean any stray Markdown or newlines
//     answer = answer.replace(/[*_~`]/g, "").replace(/\\n/g, " ").replace(/\s+/g, " ").trim();

//     console.log("✅ RAG LLM Response:", answer);
//     return answer;
//   } catch (err) {
//     console.error("❌ LLM invocation failed:", err.message);
//     return "I don't know.";
//   }
// }



// // src/scripts/loadSampleData.js
// import { DataAPIClient } from "@datastax/astra-db-ts";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { pipeline } from "@xenova/transformers";

// // TensorFlow USE
// import * as use from "@tensorflow-models/universal-sentence-encoder";
// import * as tf from "@tensorflow/tfjs-node";

// // ---------------------- Setup ----------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// // const urls = [
// //   "https://www.azamportfolio.com/",
// //   "https://www.azamportfolio.com/about",
// //   "https://www.azamportfolio.com/#skills",
// //   "https://www.azamportfolio.com/blogs",
// //   "https://www.azamportfolio.com/#services",
// //   "https://www.azamportfolio.com/projects/1",
// //  "https://www.azamportfolio.com/projects/2",
// //  "https://www.azamportfolio.com/projects/3",
// //   "https://www.azamportfolio.com/projects/4",
// //   "https://www.wikipedia.org/wiki/Artificial_intelligence",
// //   "https://www.wikipedia.org/wiki/Machine_learning",
// //   'https://hiparks.com/',
// //   'https://hiparks.com/contact',
// //   'https://hiparks.com/case-studies',
// //   'https://hiparks.com/media/press_releases',
// //   'https://hiparks.com/sustainability#governance',
// //   'https://hiparks.com/explore/',

// //   // Add new URLs here
// // ];

// const urls = [
//   // 🌐 Personal
//   "https://www.azamportfolio.com/",
//   "https://www.azamportfolio.com/about",
//   "https://www.azamportfolio.com/projects",
//   "https://www.azamportfolio.com/blogs",

//   // ⚙️ Web Dev
//   "https://nextjs.org/blog",
//   "https://nextjs.org/changelog",
//   "https://github.com/vercel/next.js/releases",
//   "https://react.dev/blog",
//   "https://github.com/facebook/react/releases",
//   "https://tailwindcss.com/blog",
//   "https://github.com/tailwindlabs/tailwindcss/releases",
//   "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",

//   // 🤖 AI Tools
//   "https://platform.openai.com/docs/overview",
//   "https://www.langchain.com/",
//   "https://huggingface.co/blog",
//   "https://openrouter.ai/docs",
//   "https://ollama.ai/blog",
//   "https://www.anthropic.com/news",

//   // 📚 Learning
//   "https://roadmap.sh/",
//   "https://www.freecodecamp.org/news/",
//   "https://www.geeksforgeeks.org/",
//   "https://kaggle.com/learn",
//   "https://dev.to/",

//   // 📰 Trends
//   "https://techcrunch.com/tag/artificial-intelligence/",
//   "https://www.theverge.com/ai-artificial-intelligence",
//   "https://news.ycombinator.com/",
//   "https://thenextweb.com/",
//   "https://www.wired.com/category/ai/",
// ];


// // let useModel;
// // async function getSingleEmbedding(text) {
// //   if (!useModel) useModel = await use.load();
// //   const embeddings = await useModel.embed([text]);
// //   const array = await embeddings.array();
// //   return array[0]; // returns 512-dim vector
// // }

// let embedder;

// async function initEmbedder() {
//   if (!embedder) {
//     embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
//   }
// }

// export async function getSingleEmbedding(text) {
//   await initEmbedder();
//   const result = await embedder(text);
//   // Flatten output to 1D array if needed
//   return result.flat(2);
// }


// // ---------------------- Local Embeddings ----------------------
// class LocalEmbeddings {
//   async embedQuery(text) {
//     return await getSingleEmbedding(text);
//   }
//   async embedDocuments(texts) {
//     return await Promise.all(texts.map((t) => this.embedQuery(t)));
//   }
// }
// const embeddings = new LocalEmbeddings();

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 100,
// });

// // ---------------------- Scraper ----------------------
// async function scrapePage(url) {
//   try {
//     const loader = new PuppeteerWebBaseLoader(url, {
//       launchOptions: { headless: "new" },
//       gotoOptions: { waitUntil: "domcontentloaded", timeout: 60000 },
//       evaluate: async (page, browser) => {
//         const text = await page.evaluate(() => document.body.innerText);
//         await browser.close();
//         return text;
//       },
//     });
//     const content = (await loader.scrape())?.replace(/\s+/g, " ").trim() || "";
//     return content;
//   } catch (err) {
//     console.warn(`⚠️ Failed to scrape ${url}:`, err.message);
//     return "";
//   }
// }

// // ---------------------- Load Sample Data (Incremental) ----------------------
// async function loadSampleData() {
//   console.log("🧠 Starting data ingestion...");

//   const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
//   // const db = client.db(process.env.ASTRA_DB_ENDPOINT, {
//   //   namespace: process.env.ASTRA_DB_NAMESPACE,
//   // });
// const db = client.db(process.env.ASTRA_DB_ENDPOINT);


//   for (const url of urls) {
//     console.log("🌐 Scraping:", url);
//     const content = await scrapePage(url);
//     if (!content) continue;

//     const chunks = await splitter.splitText(content);
//     console.log(`🧩 Split into ${chunks.length} chunks`);

//     for (const chunk of chunks) {
//       try {
//         // ✅ Check if chunk already exists
//         const existing = await db
//           .collection(process.env.ASTRA_DB_COLLECTION)
//           .findOne({ content: chunk });

//         if (existing) {
//           console.log("ℹ️ Chunk already exists, skipping");
//           continue;
//         }

//         const embedding = await embeddings.embedQuery(chunk);

//         await db.collection(process.env.ASTRA_DB_COLLECTION).insertOne({
//           content: chunk,
//           embedding,
//         });

//         await new Promise((r) => setTimeout(r, 50)); // avoid overload
//         console.log("✅ New chunk inserted");
//       } catch (err) {
//         console.error("❌ Failed to insert chunk:", err.message);
//       }
//     }
//   }

//   console.log("✅ Data ingestion completed!");
// }




// loadSampleData().catch((err) => console.error("❌ Ingestion error:", err));



// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import fetch from "node-fetch";
// import { DataAPIClient } from "@datastax/astra-db-ts";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
// import * as use from "@tensorflow-models/universal-sentence-encoder";
// import * as tf from "@tensorflow/tfjs-node";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// // let embedder;

// let useModel;

// async function getSingleEmbedding(text) {
//   if (!useModel) {
//     console.log("📦 Loading Universal Sentence Encoder...");
//     useModel = await use.load(); // full USE model for Node
//   }
//   const embeddings = await useModel.embed([text]); // [1,512]
//   const array = await embeddings.array();          // [[...512 dims]]
//   return array[0]; // flatten to 1D array
// }
// // ---------------------- Local Embeddings ----------------------
// class LocalEmbeddings {
//   async embedQuery(text) {
//     return await getSingleEmbedding(text); // returns a 512-dim float array
//   }
// }

// const embeddings = new LocalEmbeddings();

// // ---------------------- Astra DB ----------------------
// const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
// const db = client.db(process.env.ASTRA_DB_ENDPOINT, {
//   keyspace: process.env.ASTRA_DB_NAMESPACE,
// });
// // ---------------------- URLs ----------------------
// const urls = [
//   "https://www.azamportfolio.com/",
//   "https://en.wikipedia.org/wiki/List_of_last_words/",
//   "https://nextjs.org/blog",
//   "https://react.dev/blog",
//   "https://huggingface.co/blog",
//   "https://roadmap.sh/",
// ];

// // ---------------------- Text Splitter ----------------------
// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 100,
// });

// // ---------------------- Scraper ----------------------
// async function scrapePage(url) {
//   try {
//     const loader = new PuppeteerWebBaseLoader(url, {
//       launchOptions: { headless: "new" },
//       gotoOptions: { waitUntil: "domcontentloaded", timeout: 60000 },
//       evaluate: async (page, browser) => {
//         const text = await page.evaluate(() => document.body.innerText);
//         await browser.close();
//         return text;
//       },
//     });
//     return (await loader.scrape())?.replace(/\s+/g, " ").trim() || "";
//   } catch (err) {
//     console.warn(`⚠️ Failed to scrape ${url}:`, err.message);
//     return "";
//   }
// }

// // ---------------------- Load Data ----------------------
// async function loadSampleData() {
//   console.log("🧠 Starting data ingestion...");

//   for (const url of urls) {
//     console.log("🌐 Scraping:", url);
//     const content = await scrapePage(url);
//     if (!content) continue;

//     const chunks = await splitter.splitText(content);
//     console.log(`🧩 Split into ${chunks.length} chunks`);

//     for (const chunk of chunks) {
//       try {
//         const existing = await db
//           .collection(process.env.ASTRA_DB_COLLECTION)
//           .findOne({ content: chunk });
//         if (existing) continue;

//         const embedding = await embeddings.embedQuery(chunk);
//         await db.collection(process.env.ASTRA_DB_COLLECTION).insertOne({
//           content: chunk,
//           embedding,
//         });
//         console.log("✅ Inserted chunk");
//       } catch (err) {
//         console.error("❌ Failed to insert chunk:", err.message);
//       }
//     }
//   }

//   console.log("✅ Data ingestion completed!");
// }

// loadSampleData().catch((err) => console.error("❌ Ingestion error:", err));



// ---------------------- Imports ----------------------
import dotenv from "dotenv";
import path from "path";
import { pipeline } from "@xenova/transformers";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import * as tf from "@tensorflow/tfjs-node"; // TensorFlow bindings for Node
import * as use from "@tensorflow-models/universal-sentence-encoder"; // ✅ full USE (not lite)

// ---------------------- Config ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// ---------------------- Universal Sentence Encoder ----------------------

let embedder;

export async function getSingleEmbedding(text) {
  if (!embedder) {
    console.log("📦 Loading MiniLM Embedding Model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  // Get mean-pooled normalized embeddings
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

export class LocalEmbeddings {
  async embedQuery(text) {
    return await getSingleEmbedding(text);
  }
}
const embeddings = new LocalEmbeddings();

// ---------------------- Astra DB Setup ----------------------
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_ENDPOINT, {
  keyspace: process.env.ASTRA_DB_NAMESPACE,
});

const collectionName = process.env.ASTRA_DB_COLLECTION;

// ---------------------- URLs to Ingest ----------------------
// const urls = [
//   // 🌐 Personal
//   "https://www.azamportfolio.com/",
//   "https://www.azamportfolio.com/about",
//   "https://www.azamportfolio.com/projects",
//   "https://www.azamportfolio.com/blogs",
//   "https://en.wikipedia.org/wiki/List_of_last_words",

//   // ⚙️ Web Dev
//   "https://nextjs.org/blog",
//   "https://nextjs.org/changelog",
//   "https://github.com/vercel/next.js/releases",
//   "https://react.dev/blog",
//   "https://github.com/facebook/react/releases",
//   "https://tailwindcss.com/blog",
//   "https://github.com/tailwindlabs/tailwindcss/releases",
//   "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",

//   // 🤖 AI Tools
//   "https://platform.openai.com/docs/overview",
//   "https://www.langchain.com/",
//   "https://huggingface.co/blog",
//   "https://openrouter.ai/docs",
//   "https://ollama.ai/blog",
//   "https://www.anthropic.com/news",

//   // 📚 Learning
//   "https://roadmap.sh/",
//   "https://www.freecodecamp.org/news/",
//   "https://www.geeksforgeeks.org/",
//   "https://kaggle.com/learn",
//   "https://dev.to/",

//   // 📰 Trends
//   "https://techcrunch.com/tag/artificial-intelligence/",
//   "https://www.theverge.com/ai-artificial-intelligence",
//   "https://news.ycombinator.com/",
//   "https://thenextweb.com/",
//   "https://www.wired.com/category/ai/",
// ];
const urls = [
  // 🌐 PERSONAL
  "https://www.azamportfolio.com/",
  "https://www.azamportfolio.com/#services",
  "https://www.azamportfolio.com/#skills",
  "https://www.azamportfolio.com/#projects",
  "https://www.azamportfolio.com/#contact",
  "https://www.azamportfolio.com/blogs",
  "https://en.wikipedia.org/wiki/List_of_last_words",

  // ⚙️ CORE WEB DEVELOPMENT
  "https://nextjs.org/blog",
  "https://nextjs.org/changelog",
  "https://react.dev/blog",
  "https://react.dev/learn",
  "https://tailwindcss.com/blog",
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  "https://developer.mozilla.org/en-US/docs/Learn",
  "https://vitejs.dev/blog/",
  "https://vercel.com/changelog",
  "https://ui.shadcn.com/docs",
  "https://astro.build/blog/",
  "https://remix.run/docs/en/main",
  "https://svelte.dev/blog",
  "https://solidjs.com/news",

  // 💻 BACKEND & DATABASES
  "https://expressjs.com/en/starter/installing.html",
  "https://nodejs.org/en/blog",
  "https://www.mongodb.com/blog",
  "https://www.prisma.io/blog",
  "https://www.postgresql.org/docs/",
  "https://www.datastax.com/blog",
  "https://docs.datastax.com/en/astra/astra-db-vector/",
  "https://supabase.com/blog",
  "https://planetscale.com/blog",

  // 🤖 AI, ML, & RAG ECOSYSTEM
  "https://platform.openai.com/docs/overview",
  "https://www.langchain.com/",
  "https://docs.langchain.com/docs/",
  "https://docs.llamaindex.ai/",
  "https://huggingface.co/blog",
  "https://huggingface.co/models",
  "https://ollama.ai/blog",
  "https://openrouter.ai/docs",
  "https://www.anthropic.com/news",
  "https://docs.anthropic.com/",
  "https://deepseek.ai/blog",
  "https://github.com/openai/openai-cookbook",
  "https://ai.google.dev/docs",
  "https://mistral.ai/news",
  "https://cerebras.ai/blog/",
  "https://replicate.com/explore",

  // 🧠 AI INFRASTRUCTURE / FRAMEWORKS
  "https://pytorch.org/blog/",
  "https://www.tensorflow.org/blog",
  "https://jax.readthedocs.io/en/latest/",
  "https://docs.kaggle.com/",
  "https://www.kaggle.com/learn",
  "https://colab.research.google.com/",
  "https://lightning.ai/pages/blog/",

  // 📚 LEARNING & EDUCATION
  "https://roadmap.sh/",
  "https://www.freecodecamp.org/news/",
  "https://www.geeksforgeeks.org/",
  "https://www.w3schools.com/",
  "https://javascript.info/",
  "https://dev.to/",
  "https://www.codecademy.com/resources/blog/",
  "https://www.udemy.com/blog/",
  "https://www.coursera.org/articles",
  "https://kaggle.com/learn",
  "https://docs.github.com/en/get-started",
  "https://github.com/explore",
  "https://developer.chrome.com/blog/",

  // 🧰 DEV TOOLS & PRODUCTIVITY
  "https://code.visualstudio.com/blogs",
  "https://github.blog/",
  "https://eslint.org/blog/",
  "https://prettier.io/blog/",
  "https://vitejs.dev/blog/",
  "https://webpack.js.org/blog/",
  "https://docs.docker.com/",
  "https://www.npmjs.com/",
  "https://bun.sh/blog",
  "https://deno.com/blog",
  "https://www.typescriptlang.org/docs/handbook/intro.html",

  // 📰 TECH TRENDS & STARTUPS
  "https://techcrunch.com/tag/artificial-intelligence/",
  "https://techcrunch.com/startups/",
  "https://thenextweb.com/",
  "https://www.wired.com/category/ai/",
  "https://www.theverge.com/ai-artificial-intelligence",
  "https://news.ycombinator.com/",
  "https://venturebeat.com/ai/",
  "https://analyticsindiamag.com/",
  "https://www.marktechpost.com/",

  // 💬 COMMUNITY & CAREER
  "https://www.reddit.com/r/webdev/",
  "https://www.reddit.com/r/MachineLearning/",
  "https://www.reddit.com/r/learnprogramming/",
  "https://www.linkedin.com/pulse/",
  "https://hashnode.com/",
  "https://stackoverflow.blog/",
  "https://www.producthunt.com/stories",
];


// ---------------------- Text Splitter ----------------------
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});

// ---------------------- Scraper ----------------------
async function scrapePage(url) {
  try {
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: { headless: "new" },
      gotoOptions: { waitUntil: "domcontentloaded", timeout: 60000 },
      evaluate: async (page, browser) => {
        const text = await page.evaluate(() => document.body.innerText);
        await browser.close();
        return text;
      },
    });
    const content = await loader.scrape();
    return content?.replace(/\s+/g, " ").trim() || "";
  } catch (err) {
    console.warn(`⚠️ Failed to scrape ${url}:`, err.message);
    return "";
  }
}

// ---------------------- Main Function ----------------------
async function loadSampleData() {
  console.log("🧠 Starting data ingestion...");

  const collection = db.collection(collectionName);

  for (const url of urls) {
    console.log("🌐 Scraping:", url);
    const content = await scrapePage(url);
    if (!content) continue;

    const chunks = await splitter.splitText(content);
    console.log(`🧩 Split into ${chunks.length} chunks`);

    for (const chunk of chunks) {
      try {
        // Avoid duplicates
        const existing = await collection.findOne({ content: chunk });
        if (existing) continue;

        // Generate embedding
        const embedding = await embeddings.embedQuery(chunk);

        // Insert into Astra DB
        await collection.insertOne({
          content: chunk,
          embedding,
        });

        console.log("✅ Inserted chunk");
      } catch (err) {
        console.error("❌ Failed to insert chunk:", err.message);
      }
    }
  }

  console.log("✅ Data ingestion completed!");
}

// ---------------------- Run ----------------------
loadSampleData().catch((err) => console.error("❌ Ingestion error:", err));
