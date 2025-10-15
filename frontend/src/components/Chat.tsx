// "use client";

// import { useState } from "react";
// \import ChatInput from "./ChatInput";
// import Message from "./Message";
// import { askRAG } from "../../lib/api";

// interface Msg {
//   role: "user" | "assistant";
//   text: string;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<Msg[]>([]);
//   const [loading, setLoading] = useState(false);

//   async function handleSend(query: string) {
//     if (!query.trim()) return;

//     const userMsg: Msg = { role: "user", text: query };
//     setMessages((prev) => [...prev, userMsg]);
//     setLoading(true);

//     const answer = await askRAG(query);

//     const botMsg: Msg = { role: "assistant", text: answer };
//     setMessages((prev) => [...prev, botMsg]);
//     setLoading(false);
//   }

//   return (
//     <div className="w-full max-w-2xl flex flex-col gap-4 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-4 bg-white dark:bg-[#121212]">
//       <h1 className="text-xl font-semibold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
//         🤖 RAG Chat Assistant
//       </h1>

//       <div className="flex-1 overflow-y-auto space-y-3 p-2 min-h-[60vh]">
//         {messages.length === 0 && (
//           <p className="text-center text-gray-400 text-sm">
//             Ask anything — powered by your custom RAG knowledge base.
//           </p>
//         )}
//         {messages.map((msg, i) => (
//           <Message key={i} role={msg.role} text={msg.text} />
//         ))}
//         {loading && (
//           <p className="text-center text-sm text-purple-500 animate-pulse">Thinking...</p>
//         )}
//       </div>

//       <ChatInput onSend={handleSend} disabled={loading} />
//     </div>
//   );
// }
