// import { DataAPIClient } from "@datastax/astra-db-ts";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // Define __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// type SimilarityMetric = "COSINE" | "euclidean" | "dot_product";

// // Load environment variables
// const result = dotenv.config({ path: path.resolve(__dirname, "../../.env") });
// if (result.error) {
//   console.error("❌ Error loading .env file in ragService.js:", result.error);
//   process.exit(1);
// }

// const myData =[
//     'https://www.azamportfolio.com/',
//     'https://www.azamportfolio.com/about',
//     'https://www.azamportfolio.com/projects',
//     'https://www.azamportfolio.com/contact',
//     'https://www.azamportfolio.com/blog',
//     'https://www.wikipedia.org/',
//     'https://www.wikipedia.org/wiki/Artificial_intelligence',
//     'https://www.wikipedia.org/wiki/Machine_learning',
//     'https://www.wikipedia.org/wiki/Deep_learning',
//     'https://www.wikipedia.org/wiki/ChatGPT',
//     'https://www.wikipedia.org/wiki/Transformer_(machine_learning_model)',
//     'https://www.wikipedia.org/wiki/Neural_network',
//     'https://www.wikipedia.org/wiki/Natural_language_processing',
//     'https://en.wikipedia.org/wiki/Lists_of_celebrities','https://en.wikipedia.org/wiki/List_of_men%27s_footballers_with_100_or_more_international_caps'
// ]

// const client = new DataAPIClient(ASTRA_DB_TOKEN)
// const db= client.db(ASTRA_DB_ENDPOINT,{namespace:ASTRA_DB_NAMESPACE})

// const llm = new ChatGroq({
//   model: "llama-3.1-70b-versatile",
//   apiKey: process.env.GROQ_API_KEY,
// });

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 512,
//   chunkOverlap: 100,
// });

// const createCollection = async () => {
//     const res = await db.createCollection({
//         name: ASTRA_DB_COLLECTION,
//         vector: {
     
//             dimensions: 384, // Must match embedding dimensions),
//             metric:SimilarityMetric,
//         }})
//         console.log('Collection created',res)
// }

// const loadSampleData = async () => {
//     const collection = db.collection(ASTRA_DB_COLLECTION)
//     for await( const url of myData){
//         const content =await scrapePage(url)
//         const chunks= await splitter.splitText(content)
//         for await(const chunk of chunks){
// const embedding = await 
//         }
//     }


//     const scrapePage = async (url) => {
//         try {
//           const loader = new PuppeteerWebBaseLoader(url,{
//             launchOptions: { headless: "new" },
//             gotoOptions: { waitUntil: "domcontentloaded", timeout: 60000 },
//             evaluate:async(page,browser) => {
//                 const result = await page.evaluate(()=>(
//                     document.body.innerHTML

//                 ) await browser.close()
//             return result)
//             }
//           });

//         }
//         return (await loader.scrape())?.replace(/\s+/g, ' ').trim() || '';
//           }

//           createCollection().then(()=>loadSampleData())



import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { ChatGroq } from "@langchain/groq";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Validate necessary envs
const {
  ASTRA_DB_TOKEN,
  ASTRA_DB_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  GROQ_API_KEY,
} = process.env;

if (!ASTRA_DB_TOKEN || !ASTRA_DB_ENDPOINT || !ASTRA_DB_NAMESPACE || !ASTRA_DB_COLLECTION) {
  console.error("❗ Missing Astra DB config in .env");
  process.exit(1);
}

if (!GROQ_API_KEY) {
  console.warn("⚠️ Warning: GROQ_API_KEY not set; LLM calls may fail");
}

// Sample URLs to scrape
const myData = [
  "https://www.azamportfolio.com/",
  "https://www.azamportfolio.com/about",
  "https://www.azamportfolio.com/projects",
  "https://www.azamportfolio.com/contact",
  "https://www.azamportfolio.com/blog",
  "https://www.wikipedia.org/",
  "https://www.wikipedia.org/wiki/Artificial_intelligence",
  "https://www.wikipedia.org/wiki/Machine_learning",
  "https://www.wikipedia.org/wiki/Deep_learning",
  "https://www.wikipedia.org/wiki/ChatGPT",
  "https://www.wikipedia.org/wiki/Transformer_(machine_learning_model)",
  "https://www.wikipedia.org/wiki/Neural_network",
  "https://www.wikipedia.org/wiki/Natural_language_processing",
  "https://en.wikipedia.org/wiki/Lists_of_celebrities",
  "https://en.wikipedia.org/wiki/List_of_men%27s_footballers_with_100_or_more_international_caps",
];

// Setup embedding model
const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HF_API_KEY, 
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

// Setup LLM (for later use, though ingestion doesn’t need it)
const llm = new ChatGroq({
  model: "llama-3.2-90b-text-preview", // A model that is currently supported
  apiKey: GROQ_API_KEY,
});

// Function to create the Astra DB collection (if not exists)
async function createCollection() {
  const client = new DataAPIClient(ASTRA_DB_TOKEN);
  const db = client.db(ASTRA_DB_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });
  try {
    const res = await db.createCollection({
      name: ASTRA_DB_COLLECTION,
      vector: {
        dimensions: 384,
        metric: "COSINE",
      },
    });
    console.log("✨ Collection created:", res);
  } catch (err) {
    console.warn("⚠️ Creating collection possibly failed or exists:", err.message);
  }
}

// Function to load & index sample data
async function loadSampleData() {
  const client = new DataAPIClient(ASTRA_DB_TOKEN);
  const db = client.db(ASTRA_DB_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });
  const collection = db.collection(ASTRA_DB_COLLECTION);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100,
  });

  for (const url of myData) {
    console.log("🕸 Scraping:", url);
    let content = "";
    try {
      const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: { headless: true },
        gotoOptions: { waitUntil: "domcontentloaded", timeout: 60000 },
      });
      const docs = await loader.load(); // returns list of docs
      content = docs.map(d => d.pageContent).join("\n");
    } catch (err) {
      console.warn("⚠️ Scrape failed:", url, err.message);
      continue;
    }

    // Split into chunks
    const chunks = await splitter.splitText(content);

    for (const chunk of chunks) {
      try {
        // Compute embedding for this chunk
        const vector = await embeddings.embedQuery(chunk);
        // Upsert into Astra collection with vector and chunk text
        await collection.updateOne(
          { document: chunk }, // key field (you may choose a better ID)
          {
            $set: {
              text: chunk,
              embedding: vector,
            },
          },
          { upsert: true }
        );
      } catch (err) {
        console.error("❌ Embedding or DB insert failed:", err.message);
      }
    } // end for chunk
  } // end for url
}

// Run ingestion
(async () => {
  await createCollection();
  await loadSampleData();
  console.log("✅ Finished ingestion");
})();
