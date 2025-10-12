// import express from "express";
// import { runRAGQuery } from "../services/ragService.js";

// const router = express.Router();

// // router.post("/", async (req, res) => {
// //   try {
// //     const { query } = req.body;
// //     if (!query) return res.status(400).json({ error: "Query text is required" });

// //     const response = await runRAGQuery(query);
// //     res.json({ response });
// //   } catch (err) {
// //     console.error("❌ Chat route error:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// router.post("/", async (req, res) => {
//   try {
//     const { query } = req.body;
//     if (!query) return res.status(400).json({ error: "Query text is required" });

//     console.log("💬 Incoming query:", query);

//     const response = await runRAGQuery(query);

//     console.log("✅ Response from RAG:", response);
//     res.json({ response });
//   } catch (err) {
//     console.error("❌ Chat route error:", err);
//     res.status(500).json({ error: err.message || "Internal server error" });
//   }
// });


// export default router;


import express from "express";
import { runRAGQuery } from "../services/ragService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query text is required" });

    console.log("💬 Incoming query:", query);

    const response = await runRAGQuery(query);

    console.log("✅ Response from RAG:", response);
    res.json({ response });
  } catch (err) {
    console.error("❌ Chat route error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
