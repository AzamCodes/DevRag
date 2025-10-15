// components/ChatWindow.tsx
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// // import { askRAG } from "@/lib/api";
// import ChatInput from "./ChatInput";
// import MessageBubble from "./MessageBubble";
// import { motion } from "framer-motion";
// import { askRAG } from "../../lib/api";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
// };

// const STORAGE_KEY = "devrag_chat_history_v1";

// export default function ChatWindow() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // load history
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) setMessages(JSON.parse(raw));
//     } catch (e) {}
//   }, []);

//   useEffect(() => {
//     // persist
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
//     } catch (e) {}
//     // scroll to bottom on new message
//     containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages]);

//   const addMessage = (m: Message) => setMessages((s) => [...s, m]);

//   const handleSend = async (text: string) => {
//     const trimmed = text.trim();
//     if (!trimmed) return;

//     const userMsg: Message = { id: String(Date.now()) + "-u", role: "user", text: trimmed, ts: Date.now() };
//     addMessage(userMsg);
//     setLoading(true);

//     try {
// const response = await askRAG(trimmed);

//       // optional: try to parse JSON sources if your backend returns structured data
//       const assistantMsg: Message = {
//         id: String(Date.now()) + "-a",
//         role: "assistant",
//         text: response,
//         ts: Date.now(),
//       };

//       addMessage(assistantMsg);
//     } catch (err: any) {
//       const errMsg: Message = {
//         id: String(Date.now()) + "-err",
//         role: "assistant",
//         text: `❌ Error: ${err.message || "Request failed"}`,
//         ts: Date.now(),
//       };
//       addMessage(errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setMessages([]);
//     localStorage.removeItem(STORAGE_KEY);
//   };

//   return (
//     <div className="bg-white shadow-xl rounded-2xl overflow-hidden h-full flex flex-col border border-gray-100">
//       {/* header */}
//       <div className="px-6 py-4 border-b flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold">DevRAG — AI & Web Dev Assistant</h2>
//           <p className="text-sm text-slate-500">Ask questions about AI, Next.js, or learning pathways</p>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleClear}
//             className="text-xs px-3 py-1 rounded-full border hover:bg-gray-50 transition"
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       {/* messages */}
//       <div ref={containerRef} className="flex-1 overflow-auto p-6 space-y-4">
//         {messages.length === 0 && (
//           <div className="max-w-md mx-auto text-center text-slate-400">
//             <p className="mb-2">Welcome — ask anything about AI or web development.</p>
//             <p className="text-xs">Your curated knowledge base powers the answers.</p>
//           </div>
//         )}

//         {messages.map((m) => (
//           <motion.div
//             key={m.id}
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.18 }}
//           >
//             <MessageBubble message={m} />
//           </motion.div>
//         ))}
//       </div>

//       {/* footer / input */}
//       <div className="px-4 py-3 border-t bg-white">
//         <ChatInput onSend={handleSend} loading={loading} />
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import ChatInput from "./ChatInput";
// import MessageBubble from "./MessageBubble";
// import { motion } from "framer-motion";
// import { askRAG } from "../../lib/api";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
// };

// const STORAGE_KEY = "devrag_chat_history_v1";

// export default function ChatWindow() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   // Load message history
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) setMessages(JSON.parse(raw));
//     } catch (e) {}
//   }, []);

//   // Save message history & auto-scroll
//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
//     } catch (e) {}
//     containerRef.current?.scrollTo({
//       top: containerRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages]);

//   const addMessage = (m: Message) => setMessages((s) => [...s, m]);

//   const handleSend = async (text: string) => {
//     const trimmed = text.trim();
//     if (!trimmed) return;

//     const userMsg: Message = {
//       id: String(Date.now()) + "-u",
//       role: "user",
//       text: trimmed,
//       ts: Date.now(),
//     };
//     addMessage(userMsg);

//     // Add temporary "thinking" message
//     const thinkingMsg: Message = {
//       id: String(Date.now()) + "-thinking",
//       role: "assistant",
//       text: "💭 Thinking...",
//       ts: Date.now(),
//     };
//     addMessage(thinkingMsg);
//     setLoading(true);

//     try {
//       const response = await askRAG(trimmed); // ✅ fixed destructuring

//       // Replace the thinking bubble with actual answer
//       setMessages((prev) =>
//         prev.map((m) =>
//           m.id === thinkingMsg.id
//             ? { ...m, text: response }
//             : m
//         )
//       );
//     } catch (err: any) {
//       setMessages((prev) =>
//         prev.map((m) =>
//           m.id === thinkingMsg.id
//             ? { ...m, text: `❌ Error: ${err.message || "Request failed"}` }
//             : m
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setMessages([]);
//     localStorage.removeItem(STORAGE_KEY);
//   };

//   return (
//     <div className="bg-[#181818] shadow-xl rounded-xl overflow-hidden h-full flex flex-col border">
//       {/* Header */}
//       <div className="px-6 py-4  flex items-center justify-between">
//         <div>
//           <h2 className="text-lg text-white font-semibold">DevRAG — AI & Web Dev Assistant</h2>
//           <p className="text-sm text-white/75">
//             Ask questions about AI, Next.js, or learning pathways
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleClear}
//             className="text-xs px-3 py-1 bg-white/80 rounded-full border hover:bg-gray-50 transition"
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       {/* Messages */}
//       <div ref={containerRef} className="flex-1 overflow-auto p-6 space-y-4">
//         {messages.length === 0 && (
//           <div className="max-w-md mx-auto text-center text-slate-400">
//             <p className="mb-2">Welcome — ask anything about AI or web development.</p>
//             <p className="text-xs">Your curated knowledge base powers the answers.</p>
//           </div>
//         )}

//         {messages.map((m) => (
//           <motion.div
//             key={m.id}
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.18 }}
//           >
//             <MessageBubble message={m} />
//           </motion.div>
//         ))}

//         {/* Animated “typing dots” when loading */}
//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-white/80 px-4 py-3 rounded-2xl text-slate-700 flex items-center gap-2">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                 <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                 <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce"></div>
//               </div>
//               <span className="text-xs text-white/9bg-white/90">Assistant is typing...</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="px-4 py-3  bg-inherit">
//         <ChatInput onSend={handleSend} loading={loading} />
//       </div>
//     </div>
//   );
// }

//
//
//
//

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import ChatInput from "./ChatInput";
// import MessageBubble from "./MessageBubble";
// import { motion } from "framer-motion";
// import { askRAG } from "../../lib/api";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
// };

// const STORAGE_KEY = "devrag_chat_history_v1";

// // function extractUrls(text: any): { title: string; url: string }[] {
// //   if (!text) return [];
// //   const str = String(text); // <-- convert to string
// //   const urlRegex = /(https?:\/\/[^\s]+)/g;
// //   const matches = str.match(urlRegex);
// //   if (!matches) return [];
// //   return matches.map((url) => ({ title: url, url }));
// // }
// function extractUrls(text: any): { title: string; url: string }[] {
//   if (!text) return [];
//   const str = String(text);
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const matches = str.match(urlRegex);
//   if (!matches) return [];
//   return matches.map((url) => ({ title: url, url })); // returns correct type
// }

// function removeUrlsFromText(text: any): string {
//   if (!text) return "";
//   return String(text).replace(/https?:\/\/[^\s]+/g, "").trimEnd();
// }


// export default function ChatWindow() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
//   const [inputText, setInputText] = useState(""); // current input
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   // Load message history
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) setMessages(JSON.parse(raw));
//     } catch (e) {}
//   }, []);

//   // Save message history & auto-scroll
//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
//     } catch (e) {}
//     containerRef.current?.scrollTo({
//       top: containerRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages]);

//   const addMessage = (m: Message) => setMessages((s) => [...s, m]);

//   const handleSend = async (text: string) => {
//     const trimmed = text.trim();
//     if (!trimmed) return;

 
//     if (editingMessageId) {
//   // 1️⃣ Replace the user message
//   setMessages((prev) =>
//     prev.map((m) => (m.id === editingMessageId ? { ...m, text: trimmed } : m))
//   );

//   // 2️⃣ Remove the assistant message after it (like ChatGPT does)
//   setMessages((prev) =>
//     prev.filter((m, i, arr) => {
//       const msg = arr.find((x) => x.id === editingMessageId);
//       const msgIndex = arr.indexOf(msg!);
//       // remove assistant message that comes right after the edited one
//       return i !== msgIndex + 1;
//     })
//   );

//   // 3️⃣ Proceed as a normal send (get a new assistant reply)
//   setEditingMessageId(null);
//   setInputText("");

//   // Send to API again
//   const responseMsg: Message = {
//     id: String(Date.now()) + "-u",
//     role: "user",
//     text: trimmed,
//     ts: Date.now(),
//   };
//   addMessage(responseMsg);

//   const thinkingMsg: Message = {
//     id: String(Date.now()) + "-thinking",
//     role: "assistant",
//     text: "💭 Thinking...",
//     ts: Date.now(),
//   };
//   addMessage(thinkingMsg);

//   setLoading(true);
//   try {
//     const { response, sources } = await askRAG(trimmed);

// setMessages((prev) =>
//   prev.map((m) =>
//     m.id === thinkingMsg.id
//       ? { ...m, text: response, sources: sources || [] }
//       : m
//   )
// );

//   } catch (err: any) {
//     setMessages((prev) =>
//       prev.map((m) =>
//         m.id === thinkingMsg.id
//           ? { ...m, text: `❌ Error: ${err.message || "Request failed"}` }
//           : m
//       )
//     );
//   } finally {
//     setLoading(false);
//   }

//   return;
// }


//     const userMsg: Message = {
//       id: String(Date.now()) + "-u",
//       role: "user",
//       text: trimmed,
//       ts: Date.now(),
//     };
//     addMessage(userMsg);

//     // Add temporary "thinking" message
//     const thinkingMsg: Message = {
//       id: String(Date.now()) + "-thinking",
//       role: "assistant",
//       text: "💭 Thinking...",
//       ts: Date.now(),
//     };
//     addMessage(thinkingMsg);
//     setLoading(true);

// //     try {
// //       // const response = await askRAG(trimmed); 

// //       // Replace the thinking bubble with actual answer
// //       // setMessages((prev) =>
// //       //   prev.map((m) => (m.id === thinkingMsg.id ? { ...m, text: response } : m))
// //       // );

// //       const { response, sources } = await askRAG(trimmed);

// // setMessages((prev) =>
// //   prev.map((m) =>
// //     m.id === thinkingMsg.id
// //       ? { ...m, text: response, sources: sources || [] }
// //       : m
// //   )
// // );

// //     } catch (err: any) {
// //       setMessages((prev) =>
// //         prev.map((m) =>
// //           m.id === thinkingMsg.id
// //             ? { ...m, text: `❌ Error: ${err.message || "Request failed"}` }
// //             : m
// //         )
// //       );
// //     } finally {
// //       setLoading(false);
// //     }

// try {
//   const response = await askRAG(trimmed); // response is plain text from backend

//   // Extract URLs
//  const urls = extractUrls(response);
// const cleanText = removeUrlsFromText(response);

// setMessages((prev:any) =>
//   prev.map((m:any) =>
//     m.id === thinkingMsg.id
//       ? { ...m, text: response, sources: extractUrls(response) }
//       : m
//   )
// );

// } catch (err: any) {
//   setMessages((prev) =>
//     prev.map((m) =>
//       m.id === thinkingMsg.id
//         ? { ...m, text: `❌ Error: ${err.message || "Request failed"}` }
//         : m
//     )
//   );
// } finally {
//   setLoading(false);
// }

//   };

//   const handleClear = () => {
//     setMessages([]);
//     localStorage.removeItem(STORAGE_KEY);
//   };

//   const handleEdit = (messageId: string, text: string) => {
//     setEditingMessageId(messageId);
//     setInputText(text);

//     // Focus input manually if needed
//     const input = document.querySelector<HTMLInputElement>("input[type='text']");
//     input?.focus();
//   };

//   return (
//     <div className="bg-[#181818]/75 shadow-xl sm:rounded-xl overflow-hidden h-full flex flex-col border">
//       {/* Header */}
//       <div className="px-6 py-4 flex items-center justify-between">
//         <div>
// <h2 className="text-lg text-white font-semibold">
//   DevRAG (Built by <a href="https://www.azamportfolio.com" target="_blank" className="text-[#5967FF] hover:underline"> Azam Shaikh</a>)
// </h2>
//           <p className="text-sm text-white/75">
//             Ask questions about AI, Next.js, or learning pathways
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleClear}
//             className="text-xs px-3 py-1 bg-white/80 rounded-full border hover:bg-gray-50 transition"
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       {/* Messages */}
//       <div ref={containerRef} className="flex-1 overflow-auto p-6 space-y-4">
//    {messages.length === 0 && (
//   <div className="max-w-md mx-auto text-center text-white/65 space-y-4">
//     <div>
//       <h3 className="text-lg font-semibold text-white">👋 Welcome to DevRAG</h3>
//       <p className="text-sm text-white/70">
//         Ask me anything about web dev, AI tools, or learning paths.
//       </p>
//     </div>

//     {/* 🔥 Suggested Questions */}
//     <div className="flex flex-wrap justify-center gap-2">
//       {[
//         "What’s new in React 19?",
//         "How do I deploy a Next.js app?",
//         "Best AI tools for developers?",
//         "How can I connect Prisma with PostgreSQL?",
//         "What’s the best roadmap to learn full stack?",
//         "How does RAG work in AI?",
//       ].map((q) => (
//         <button
//           key={q}
//           onClick={() => handleSend(q)}
//           className="text-sm px-3 py-1.5 bg-white/10 border border-white/10 text-white rounded-full hover:bg-white/20 transition"
//         >
//           {q}
//         </button>
//       ))}
//     </div>

//     <p className="text-xs text-white/50 mt-3">
//       Powered by your curated developer knowledge base ⚡
//     </p>
//   </div>
// )}


//         {messages.map((m) => (
//           <motion.div
//             key={m.id}
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.18 }}
//           >
//             <MessageBubble
//               message={{ ...m, onEdit: m.role === "user" ? (text) => handleEdit(m.id, text) : undefined }}
//             />
//           </motion.div>
//         ))}

//         {/* Animated “typing dots” when loading */}
//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-white/10 px-4 py-3 rounded-2xl text-slate-700 flex items-center gap-2">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                 <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                 <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce"></div>
//               </div>
//               <span className="text-xs text-white/90">Assistant is typing...</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="px-4 py-3 pb-10 sm:pb-3 bg-inherit">  
//         <ChatInput
//           onSend={handleSend}
//           loading={loading}
//           value={inputText}
//           onChange={setInputText}
//         />
//         <p className="text-[11px] text-white/40 text-center mt-2">
//   Built with ❤️ by <a
//   href="https://www.azamportfolio.com"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="text-white/80 font-medium hover:text-white"
// >
//   Azam Shaikh
// </a>

// </p>

//       </div>
//     </div>
//   );
// }

//
//
//
"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { motion } from "framer-motion";
import { askRAG } from "../../lib/api";

export interface RAGResponse {
  response: string;
  sources?: { title?: string; url?: string }[];
  error?: string;
}

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
  sources?: { title?: string; url?: string }[];
};

const STORAGE_KEY = "devrag_chat_history_v1";

// --- Utility functions ---
function extractUrls(text: string): { title: string; url: string }[] {
  if (!text) return [];
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  if (!matches) return [];
  return matches.map((url) => ({ title: url, url }));
}

function removeUrlsFromText(text: string): string {
  if (!text) return "";
  return text.replace(/https?:\/\/[^\s]+/g, "").trim();
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load chat history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) {}
  }, []);

  // Save chat history & auto-scroll
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {}
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const addMessage = (m: Message) => setMessages((s) => [...s, m]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editingMessageId) {
      // 🧩 Replace edited user message
      setMessages((prev) =>
        prev.map((m) => (m.id === editingMessageId ? { ...m, text: trimmed } : m))
      );

      // 🧹 Remove the next assistant message
      setMessages((prev) => {
        const msgIndex = prev.findIndex((m) => m.id === editingMessageId);
        return prev.filter((_, i) => i !== msgIndex + 1);
      });

      setEditingMessageId(null);
      setInputText("");
    }

    // Add user message
    const userMsg: Message = {
      id: String(Date.now()) + "-u",
      role: "user",
      text: trimmed,
      ts: Date.now(),
    };
    addMessage(userMsg);

    // Add temporary assistant message
    const thinkingMsg: Message = {
      id: String(Date.now()) + "-thinking",
      role: "assistant",
      text: "💭 Thinking...",
      ts: Date.now(),
    };
    addMessage(thinkingMsg);

    setLoading(true);
    try {
      const data: RAGResponse = await askRAG(trimmed);

      const cleanText = removeUrlsFromText(data.response);
      const urls = data.sources?.length ? data.sources : extractUrls(data.response);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingMsg.id
            ? { ...m, text: cleanText, sources: urls }
            : m
        )
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingMsg.id
            ? { ...m, text: `❌ Error: ${err.message || "Request failed"}` }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleEdit = (messageId: string, text: string) => {
    setEditingMessageId(messageId);
    setInputText(text);

    // Focus input manually if needed
    const input = document.querySelector<HTMLInputElement>("input[type='text']");
    input?.focus();
  };

  return (
    <div className="bg-[#181818]/75 shadow-xl sm:rounded-xl overflow-hidden h-full flex flex-col border">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg text-white font-semibold">
            DevRAG (Built by{" "}
            <a
              href="https://www.azamportfolio.com"
              target="_blank"
              className="text-[#5967FF] hover:underline"
            >
              {" "}
              Azam Shaikh
            </a>
            )
          </h2>
          <p className="text-sm text-white/75">
            Ask questions about AI, Next.js, or learning pathways
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="text-xs px-3 py-1 bg-white/80 rounded-full border hover:bg-gray-50 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="max-w-md mx-auto text-center text-white/65 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                👋 Welcome to DevRAG
              </h3>
              <p className="text-sm text-white/70">
                Ask me anything about web dev, AI tools, or learning paths.
              </p>
            </div>

            {/* 🔥 Suggested Questions */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "What’s new in React 19?",
                "How do I deploy a Next.js app?",
                "Best AI tools for developers?",
                "How can I connect Prisma with PostgreSQL?",
                "What’s the best roadmap to learn full stack?",
                "How does RAG work in AI?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-sm px-3 py-1.5 bg-white/10 border border-white/10 text-white rounded-full hover:bg-white/20 transition"
                >
                  {q}
                </button>
              ))}
            </div>

            <p className="text-xs text-white/50 mt-3">
              Powered by your curated developer knowledge base ⚡
            </p>
          </div>
        )}

        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            <MessageBubble
              message={{
                ...m,
                onEdit:
                  m.role === "user" ? (text) => handleEdit(m.id, text) : undefined,
              }}
            />
          </motion.div>
        ))}

        {/* Animated “typing dots” when loading */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-3 rounded-2xl text-slate-700 flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-white/90 rounded-full animate-bounce"></div>
              </div>
              <span className="text-xs text-white/90">
                Assistant is typing...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 pb-10 sm:pb-3 bg-inherit">
        <ChatInput
          onSend={handleSend}
          loading={loading}
          value={inputText}
          onChange={setInputText}
        />
        <p className="text-[11px] text-white/40 text-center mt-2">
          Built with ❤️ by{" "}
          <a
            href="https://www.azamportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 font-medium hover:text-white"
          >
            Azam Shaikh
          </a>
        </p>
      </div>
    </div>
  );
}
