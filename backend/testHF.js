import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import dotenv from "dotenv";
dotenv.config();

async function testEmbeddings() {
 const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: process.env.HF_API_KEY,
  model: "sentence-transformers/paraphrase-MiniLM-L6-v2",});

  const vector = await embeddings.embedQuery("Hello world!");
  console.log(vector.length, vector.slice(0, 5)); // show first 5 values
}

testEmbeddings();
