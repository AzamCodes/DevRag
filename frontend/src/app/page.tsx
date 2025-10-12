// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { askRAG } from "../../lib/api";

// export default function HomePage() {
//   const [query, setQuery] = useState<string>("");
//   const [answer, setAnswer] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleAsk = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!query.trim()) return;
//     setLoading(true);
//     setAnswer("");

//     try {
//       const res = await askRAG(query);
//       setAnswer(res);
//     } catch (err) {
//       setAnswer("❌ Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col items-center justify-center px-4">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800"
//       >
//         Welcome to DevRAG — your AI study buddy.


//       </motion.h1>

//       <form
//         onSubmit={handleAsk}
//         className="w-full max-w-xl flex gap-2 items-center mb-6"
//       >
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask anything about AI, Next.js, or machine learning!..."
//           className="flex-1 px-4 py-3 rounded-2xl text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-5 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all disabled:bg-blue-300"
//         >
//           {loading ? "Thinking..." : "Ask"}
//         </button>
//       </form>

//       {answer && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md border border-gray-100"
//         >
//           <h2 className="text-lg font-semibold mb-2 text-gray-700">Answer:</h2>
//           <p className="text-gray-800 leading-relaxed whitespace-pre-line">
//             {answer}
//           </p>
//         </motion.div>
//       )}
//     </main>
//   );
// }


// app/page.tsx
"use client";

import React from "react";
import ChatWindow from "@/components/ChatWindow"
;

export default function Page() {
  return (
    <div className="w-full max-w-5xl outline-none mx-auto h-svh sm:h-[80vh]">
      <ChatWindow />
    </div>
  );
}
