// "use client";

// import React from "react";
// import { format } from "date-fns";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
// };

// function SourceList({ sources }: { sources?: Message["sources"] }) {
//   if (!sources || sources.length === 0) return null;
//   return (
//     <div className="mt-3 space-y-2">
//       <div className="text-xs text-slate-500">Sources</div>
//       <div className="flex flex-col gap-2">
//         {sources.map((s, i) => (
//           <a
//             key={i}
//             href={s.url}
//             target="_blank"
//             rel="noreferrer"
//             className="text-sm px-3 py-2 bg-slate-50 border rounded-md hover:bg-slate-100"
//           >
//             {s.title ?? s.url}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function MessageBubble({ message }: { message: Message }) {
//   const isUser = message.role === "user";

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div className="max-w-[78%]">
//         <div className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
//                 isUser ? "bg-blue-600" : "bg-slate-600"
//               }`}
//             >
//               {isUser ? "U" : "A"}
//             </div>
//           </div>

//           <div className={`${isUser ? "text-right" : "text-left"}`}>
//             <div
//               className={`px-4 py-3 rounded-2xl shadow-sm ${
//                 isUser ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-900"
//               }`}
//             >
//               {/* ✅ Markdown rendering */}
//               <div className="prose prose-sm max-w-none prose-slate">
//               <ReactMarkdown
//               remarkPlugins={[remarkGfm]}
//               rehypePlugins={[rehypeHighlight]}
//             >
//               {message.text}
//             </ReactMarkdown>
//               </div>
//             </div>

//             <div className="mt-1 text-[11px] text-slate-400">
//               {format(new Date(message.ts), "p • MMM d")}
//             </div>

//             <SourceList sources={message.sources} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import { format } from "date-fns";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import { Copy, Check, Edit } from "lucide-react"; // Lucide icons

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
//   onEdit?: (text: string) => void; // for user messages
// };
// function removeUrlsFromText(text: any): string {
//   return text.replace(/https?:\/\/[^\s]+/g, "").trim();
// }
// function extractUrls(text: string) {
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const matches = text.match(urlRegex);
//   if (!matches) return [];
//   return matches.map((url) => ({ title: url, url }));
// }

// // function SourceList({ sources }: { sources?: Message["sources"] }) {
// //   if (!sources || sources.length === 0) return null;
// //   return (
// //     <div className="mt-3 space-y-2">
// //       <div className="text-xs text-slate-500">Sources</div>
// //       <div className="flex flex-col gap-2">
// //         {sources.map((s, i) => (
// //           <a
// //             key={i}
// //             href={s.url}
// //             target="_blank"
// //             rel="noreferrer"
// //             className="text-sm px-3 py-2 bg-slate-50 border rounded-md hover:bg-slate-100"
// //           >
// //             {s.title ?? s.url}
// //           </a>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// function SourceList({ sources }: { sources?: Message["sources"] }) {
//   if (!sources || sources.length === 0) return null;


//   return (
//     <div className="mt-3">
//       <div className="text-xs text-slate-500 mb-1">📎 References</div>
//       <div className="flex flex-col gap-2">
//         {sources.map((s, i) => (
//           <a
//             key={i}
//             href={s.url}
//             target="_blank"
//             rel="noreferrer"
//             className="flex justify-between items-center text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition"
//           >
//             <span className="truncate">{s.title ?? s.url}</span>
//             <span className="text-xs text-slate-400 ml-2">↗</span>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }



// export default function MessageBubble({ message }: { message: Message }) {
//   const isUser = message.role === "user";
//   const displayText = isUser ? removeUrlsFromText(message.text) : message.text;
  
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(message.text);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Copy failed:", err);
//     }
//   };

//   // Markdown-friendly formatting
//  const formattedText = message.text
//   // Add line breaks before numbered and dash lists
//   .replace(/(\d+)\.\s*/g, "\n$1. ")
//   .replace(/-\s*/g, "\n- ")
//   // Preserve tree-like ASCII structures (├──, │, └──)
//   .replace(/(├──|└──|│)/g, "\n$1")
//   // Add spacing around code blocks and inline code
//   .replace(/`{3}([\s\S]*?)`{3}/g, "\n```\n$1\n```\n")
//   .replace(/`([^`]+)`/g, "`$1`")
//   // Bold markers
//   .replace(/\*\*(.*?)\*\*/g, "**$1**")
//   // Clean up double line breaks
//   .replace(/\n{3,}/g, "\n\n")
//   .trim();


//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
//       <div className="max-w-[78%]">
//         <div className={`flex items-end gap-1.5 ${isUser ? "flex-row-reverse" : ""}`}>
//           {/* Avatar */}
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm ${
//                 isUser ? "bg-[#4440C5]" : "bg-[#5967FF]"
//               }`}
//             >
//               {isUser ? "U" : "AI"}
//             </div>
//           </div>

//           {/* Chat Bubble */}
//           <div className={`${isUser ? "text-right" : "text-left"} relative`}>
//             <div
//               className={`px-4 py-3 rounded-2xl shadow-sm ${
//                 isUser
//                   ? "bg-[#4440C5] text-white"
//                   : "bg-white/10 text-white backdrop-blur-md border border-white/20"
//               }`}
//             >
//               <div className="prose prose-sm max-w-none prose-slate leading-relaxed">
//                 {/* <ReactMarkdown
//                   remarkPlugins={[remarkGfm]}
//                   rehypePlugins={[rehypeHighlight]}
//                 >
//                   {formattedText}
//                 </ReactMarkdown> */}
//                   <ReactMarkdown
//   remarkPlugins={[remarkGfm]}
//   rehypePlugins={[rehypeHighlight]}
// >
//   {displayText}
// </ReactMarkdown>
// <SourceList
//   sources={message.sources ?? (isUser ? extractUrls(message.text) : [])}
// />
//               </div>
//             </div>

//             {/* Timestamp */}
//             {!isUser && ( 
// <>
//                     <div className="flex justify-between items-center mt-1.5 gap-2 px-1">
//                         <button
//     onClick={handleCopy}
//     className="p-1.5 rounded hover:bg-white/5 relative"
//     title={copied ? "Copied!" : "Copy"}
//     >
//     {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white" />}
//   </button>
//               <div className="mt-1 text-[11px] text-white/85">
//               {format(new Date(message.ts), "p • MMM d")}
//             </div>
//   {/* Copy Button - for both user and assistant */}


//   {/* Edit Button - only for user messages */}
//   {/* {message.role === "user" && message.onEdit && (
//     <button
//     onClick={() => message.onEdit?.(message.text)}
//     className="p-1 rounded hover:bg-gray-200"
//     title="Edit"
//     >
//       <Edit className="w-4 h-4 text-gray-600" />
//     </button>
//   )} */}
  

// </div>
//   </>
//             )}

//             {
//             /* Sources */}
//             {/* <ReactMarkdown
//   remarkPlugins={[remarkGfm]}
//   rehypePlugins={[rehypeHighlight]}
// >
//   {displayText}
// </ReactMarkdown>
// <SourceList
//   sources={message.sources ?? (!isUser ? extractUrls(message.text) : [])}
// /> */}


//             {/* Copy/Edit buttons for USER messages only */}
//       {isUser && (
//   <div className="flex items-center  justify-between px-1  mt-2 gap-2">
     
//     {/* Timestamp */}
//     <div className="text-[11px] text-white/85">
//       {format(new Date(message.ts), "p • MMM d")}
//     </div>
//  <div className="flex gap-1">
//      {/* Copy Button */}
//     <button
//       onClick={handleCopy}
//       className="p-1.5 rounded hover:bg-white/5 relative"
//       title={copied ? "Copied!" : "Copy"}
//     >
//       {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white" />}
//     </button>
    

//     {/* Edit Button */}
//     {message.onEdit && (
//       <button
//         onClick={() => message.onEdit?.(message.text)}
//         className="p-1 rounded hover:bg-white/5"
//         title="Edit"
//       >
//         <Edit className="w-4 h-4 text-white" />
//       </button>
//     )}
//    </div>
 
//   </div>
// )}

            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import { format } from "date-fns";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import { Copy, Check, Edit } from "lucide-react";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
//   onEdit?: (text: string) => void;
// };

// // Extract URLs from text
// function extractUrls(text: any): { title: string; url: string }[] {
//   if (!text) return [];
//   const str = String(text);

//   // Match either bare URLs or inside "(link: URL)"
//   const urlRegex = /(?:\(\s*link:\s*)?(https?:\/\/[^\s)]+)\)?/gi;

//   const matches = [...str.matchAll(urlRegex)];
//   if (!matches.length) return [];

//   return matches.map((m) => ({ title: m[1], url: m[1] }));
// }

// function removeUrlsFromText(text: any): string {
//   if (!text) return "";
//   return String(text).replace(/https?:\/\/[^\s]+/g, "").trim();
// }


// // Render list of references / sources
// function SourceList({ sources }: { sources?: Message["sources"] }) {
//   if (!sources || sources.length === 0) return null;

//   return (
//     <div className="mt-3">
//       <div className="text-xs text-slate-500 mb-1">📎 References</div>
//       <div className="flex flex-col gap-2">
//         {sources.map((s, i) => (
//           <a
//             key={i}
//             href={s.url}
//             target="_blank"
//             rel="noreferrer"
//             className="flex justify-between items-center text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition"
//           >
//             <span className="truncate">{s.title ?? s.url}</span>
//             <span className="text-xs text-slate-400 ml-2">↗</span>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function MessageBubble({ message }: { message: Message }) {
//   const isUser = message.role === "user";
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(message.text);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Copy failed:", err);
//     }
//   };
//   function cleanText(text: string) {
//   return text.replace(/\(link:\s*(https?:\/\/[^\s)]+)\)/gi, "").trim();
// }


//   // Clean text for display (remove URLs if user)
// const displayText = isUser ? removeUrlsFromText(message.text) : cleanText(message.text);


//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
//       <div className="max-w-[78%]">
//         <div className={`flex items-end gap-1.5 ${isUser ? "flex-row-reverse" : ""}`}>
//           {/* Avatar */}
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm ${
//                 isUser ? "bg-[#4440C5]" : "bg-[#5967FF]"
//               }`}
//             >
//               {isUser ? "U" : "AI"}
//             </div>
//           </div>

//           {/* Chat Bubble */}
//           <div className={`${isUser ? "text-right" : "text-left"} relative`}>
//             <div
//               className={`px-4 py-3 rounded-2xl shadow-sm ${
//                 isUser
//                   ? "bg-[#4440C5] text-white"
//                   : "bg-white/10 text-white backdrop-blur-md border border-white/20"
//               }`}
//             >
//               <div className="prose prose-sm max-w-none prose-slate leading-relaxed">
//                 <ReactMarkdown
//                   remarkPlugins={[remarkGfm]}
//                   rehypePlugins={[rehypeHighlight]}
//                 >
//                   {displayText}
//                 </ReactMarkdown>
//               </div>
//             </div>

//             {/* Timestamp + Copy/Edit buttons */}
//             <div className="flex justify-between items-center mt-1.5 gap-2 px-1">
//               <div className="text-[11px] text-white/85">
//                 {format(new Date(message.ts), "p • MMM d")}
//               </div>
//               <div className="flex gap-1">
//                 <button
//                   onClick={handleCopy}
//                   className="p-1.5 rounded hover:bg-white/5 relative"
//                   title={copied ? "Copied!" : "Copy"}
//                 >
//                   {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white" />}
//                 </button>
//                 {isUser && message.onEdit && (
//                   <button
//                     onClick={() => message.onEdit?.(message.text)}
//                     className="p-1 rounded hover:bg-white/5"
//                     title="Edit"
//                   >
//                     <Edit className="w-4 h-4 text-white" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Sources */}
//             <SourceList
//               sources={message.sources ?? (isUser ? extractUrls(message.text) : [])}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React, { useState } from "react";
// import { format } from "date-fns";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import { Copy, Check, Edit, ExternalLink } from "lucide-react";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
//   onEdit?: (text: string) => void;
// };

// // Extract URLs from text, handling complete and incomplete markdown links
// function extractUrls(text: any): { title: string; url: string }[] {
//   if (!text) return [];
//   const str = String(text);
//   // Match markdown links [title](url) and bare URLs
//   const urlRegex = /\[([^\]]*)\]\((https?:\/\/[^\s)]*)\)|https?:\/\/[^\s]+/gi;
//   const matches = [...str.matchAll(urlRegex)];
//   if (!matches.length) return [];

//   return matches
//     .map((match) => {
//       // Handle complete markdown links [title](url)
//       if (match[1] && match[2] && isValidUrl(match[2])) {
//         return { title: match[1], url: match[2] };
//       }
//       // Handle bare URLs
//       const url = match[0].startsWith("[") ? null : match[0];
//       if (url && isValidUrl(url)) {
//         return { title: url, url };
//       }
//       return null;
//     })
//     .filter((item): item is { title: string; url: string } => item !== null);
// }

// // Validate URL
// function isValidUrl(url: string): boolean {
//   try {
//     new URL(url);
//     return true;
//   } catch {
//     return false;
//   }
// }

// // Remove URLs and incomplete markdown links from text
// // For user messages, just leave the text as-is (or minimal cleanup)
// function removeUrlsFromText(text: string) {
//   if (!text) return "";
//   return String(text)
//     .replace(/\[([^\]]*)\]\(/g, "$1(") // only fix incomplete markdown
//     .trim();
// }


// // Render list of references / sources
// function SourceList({ sources }: { sources?: Message["sources"] }) {
//   if (!sources || sources.length === 0) return null;

//   return (
//     <div className="mt-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4">
//       <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
//         <span className="text-base">📎</span> Sources
//       </div>
//       <ul className="space-y-2">
//         {sources.map((source, index) => (
//           <li
//             key={index}
//             className="group relative flex items-center justify-between rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out"
//           >
//             <a
//               href={source.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 truncate text-sm text-blue-600 dark:text-blue-400 hover:underline"
//               title={source.title ?? source.url}
//             >
//               {source.title ?? source.url}
//             </a>
//             <ExternalLink
//               className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200"
//               aria-hidden="true"
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default function MessageBubble({ message }: { message: Message }) {
//   const isUser = message.role === "user";
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(message.text);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Copy failed:", err);
//     }
//   };

//   function cleanText(text: string) {
//     return text.replace(/\(link:\s*(https?:\/\/[^\s)]+)\)/gi, "").trim();
//   }

//   // Clean text for display and extract sources
//   const displayText = isUser ? removeUrlsFromText(message.text) : cleanText(message.text);
//   const sources = message.sources ?? (isUser ? [] : extractUrls(message.text));

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
//       <div className="max-w-[78%]">
//         <div className={`flex items-end gap-1.5 ${isUser ? "flex-row-reverse" : ""}`}>
//           {/* Avatar */}
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm ${
//                 isUser ? "bg-[#4440C5]" : "bg-[#5967FF]"
//               }`}
//             >
//               {isUser ? "U" : "AI"}
//             </div>
//           </div>
//           {/* Chat Bubble */}
//           <div className={`${isUser ? "text-right" : "text-left"} relative`}>
//             <div
//               className={`px-4 py-3 rounded-2xl shadow-sm ${
//                 isUser
//                   ? "bg-[#4440C5] text-white"
//                   : "bg-white/10 text-white backdrop-blur-md border border-white/20"
//               }`}
//             >
//               <div className="prose prose-sm max-w-none prose-slate leading-relaxed">
//      <ReactMarkdown
//   remarkPlugins={[remarkGfm]}
//   rehypePlugins={[rehypeHighlight]}
//   components={{
//     a: ({ node, ...props }) => (
//       <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" />
//     ),
//   }}
// >
//   {displayText}
// </ReactMarkdown>

//               </div>
//             </div>
//             {/* Timestamp + Copy/Edit buttons */}
//             <div className="flex justify-between items-center mt-1.5 gap-2 px-1">
//               <div className="text-[11px] text-white/85">
//                 {format(new Date(message.ts), "p • MMM d")}
//               </div>
//               <div className="flex gap-1">
//                 <button
//                   onClick={handleCopy}
//                   className="p-1.5 rounded hover:bg-white/5 relative"
//                   title={copied ? "Copied!" : "Copy"}
//                   aria-label={copied ? "Text copied" : "Copy text"}
//                 >
//                   {copied ? (
//                     <Check className="w-4 h-4 text-green-500" />
//                   ) : (
//                     <Copy className="w-4 h-4 text-white" />
//                   )}
//                 </button>
//                 {isUser && message.onEdit && (
//                   <button
//                     onClick={() => message.onEdit?.(message.text)}
//                     className="p-1 rounded hover:bg-white/5"
//                     title="Edit"
//                     aria-label="Edit message"
//                   >
//                     <Edit className="w-4 h-4 text-white" />
//                   </button>
//                 )}
//               </div>
//             </div>
//             {/* Sources */}
//             <SourceList sources={sources} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }///
// "use client";

// import React, { useState } from "react";
// import { format } from "date-fns";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import { Copy, Check, Edit, ExternalLink } from "lucide-react";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   text: string;
//   ts: number;
//   sources?: { title?: string; url?: string }[];
//   onEdit?: (text: string) => void;
// };

// // Normalize Markdown links and ensure string
// function normalizeMarkdownLinks(text: any) {
//   if (!text) return "";
//   return String(text).replace(/\[([^\]]+)\]\(\s*\n?\s*(https?:\/\/[^\s)]+)\s*\)/g, "[$1]($2)");
// }

// // Auto-wrap tree-like text in code block
// function formatTreeText(text: string) {
//   if (!text) return "";
//   const hasTreeChars = /├──|└──/.test(text);
//   if (hasTreeChars) return "```\n" + text + "\n```";
//   return text;
// }
// function formatAiResponsePerfect(text: string) {
//   if (!text) return "";

//   let formatted = String(text);

//   // Normalize line breaks
//   formatted = formatted.replace(/\r\n|\r/g, "\n");

//   // Remove extra spaces at start/end of each line
//   formatted = formatted
//     .split("\n")
//     .map((line) => line.trimEnd())
//     .join("\n");

//   // Ensure numbered lists start on a new line
//   formatted = formatted.replace(/(\d+)\.\s+/g, "\n$1. ");

//   // Ensure bullets start on a new line
//   formatted = formatted.replace(/\s*-\s+/g, "\n- ");

//   // Fix folder tree code blocks
//   if (/├──|└──/.test(formatted)) {
//     formatted = "```\n" + formatted + "\n```";
//   }

//   // Remove multiple empty lines
//   formatted = formatted.replace(/\n{2,}/g, "\n");

//   return formatted.trim();
// }

// // Auto-format AI responses: fix bullets, numbered lists, and spacing
// function formatAiNumberedList(text: string) {
//   if (!text) return "";
//   let formatted = String(text);

//   // Fix numbered list formatting: ensure each number starts a new line
//   formatted = formatted.replace(/(\d+)\.\s+/g, "\n$1. ");

//   // Fix bullets under numbered items
//   formatted = formatted.replace(/\s*-\s+/g, "\n- ");

//   return formatted.trim();
// }

// // Extract URLs safely
// function extractUrls(text: any): { title: string; url: string }[] {
//   if (!text) return [];
//   const str = String(text);
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const matches = str.match(urlRegex);
//   if (!matches) return [];
//   return matches.map((url) => ({ title: url, url }));
// }

// // Remove URLs for clean display
// function removeUrlsFromText(text: any): string {
//   if (!text) return "";
//   return String(text).replace(/https?:\/\/[^\s]+/g, "").trim();
// }

// // Component to render source list
// function SourceList({ sources }: { sources?: Message["sources"] }) {
//   if (!sources || sources.length === 0) return null;

//   return (
//     <div className="mt-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4">
//       <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
//         <span className="text-base">📎</span> Sources
//       </div>
//       <ul className="space-y-2">
//         {sources.map((source, index) => (
//           <li
//             key={index}
//             className="group relative flex items-center justify-between rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out"
//           >
//             <a
//               href={source.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 truncate text-sm text-blue-600 dark:text-blue-400 hover:underline"
//               title={source.title ?? source.url}
//             >
//               {source.title ?? source.url}
//             </a>
//             <ExternalLink
//               className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200"
//               aria-hidden="true"
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // Main message bubble component
// export default function MessageBubble({ message }: { message: Message }) {
//   const isUser = message.role === "user";
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(message.text);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Copy failed:", err);
//     }
//   };

//   // Normalize Markdown, format AI response, wrap trees
// const normalizedText = normalizeMarkdownLinks(message.text);
// const formattedText = formatAiResponsePerfect(normalizedText);  // Extract sources safely
//   const sources = message.sources ?? extractUrls(normalizedText);

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
//       <div className="max-w-[78%]">
//         <div className={`flex items-end gap-1.5 ${isUser ? "flex-row-reverse" : ""}`}>
//           {/* Avatar */}
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm ${
//                 isUser ? "bg-[#4440C5]" : "bg-[#5967FF]"
//               }`}
//             >
//               {isUser ? "U" : "AI"}
//             </div>
//           </div>

//           {/* Chat Bubble */}
//           <div className={`${isUser ? "text-right" : "text-left"} relative`}>
//             <div
//               className={`px-4 py-3 rounded-2xl shadow-sm ${
//                 isUser
//                   ? "bg-[#4440C5] text-white"
//                   : "bg-white/10 text-white backdrop-blur-md border border-white/20"
//               }`}
//             >
//               <div className="prose prose-sm max-w-none prose-slate leading-relaxed ">
//                <ReactMarkdown
//   remarkPlugins={[remarkGfm]}
//   rehypePlugins={[rehypeHighlight]}
//   components={{
//     a: ({ node, ...props }) => (
//       <a
//         {...props}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 hover:underline"
//       />
//     ),
//   }}
// >
//   {formattedText}
// </ReactMarkdown>

//               </div>
//             </div>

//             {/* Timestamp + Copy/Edit buttons */}
//             <div className="flex justify-between items-center mt-1.5 gap-2 px-1">
//               <div className="text-[11px] text-white/85">
//                 {format(new Date(message.ts), "p • MMM d")}
//               </div>
//               <div className="flex gap-1">
//                 <button
//                   onClick={handleCopy}
//                   className="p-1.5 rounded hover:bg-white/5 relative"
//                   title={copied ? "Copied!" : "Copy"}
//                   aria-label={copied ? "Text copied" : "Copy text"}
//                 >
//                   {copied ? (
//                     <Check className="w-4 h-4 text-green-500" />
//                   ) : (
//                     <Copy className="w-4 h-4 text-white" />
//                   )}
//                 </button>
//                 {isUser && message.onEdit && (
//                   <button
//                     onClick={() => message.onEdit?.(message.text)}
//                     className="p-1 rounded hover:bg-white/5"
//                     title="Edit"
//                     aria-label="Edit message"
//                   >
//                     <Edit className="w-4 h-4 text-white" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Sources */}
//             <SourceList sources={sources} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Copy, Check, Edit, ExternalLink } from "lucide-react";

// Define the Message type
type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
  sources?: { title?: string; url?: string }[];
  onEdit?: (text: string) => void;
};

// Normalize Markdown links and ensure string
function normalizeMarkdownLinks(text: any): string {
  if (!text) return "";
  return String(text).replace(/\[([^\]]+)\]\(\s*\n?\s*(https?:\/\/[^\s)]+)\s*\)/g, "[$1]($2)");
}

// Auto-wrap tree-like text in code block
function formatTreeText(text: string): string {
  if (!text) return "";
  const hasTreeChars = /├──|└──/.test(text);
  if (hasTreeChars) return "```\n" + text + "\n```";
  return text;
}

// Auto-format AI responses: fix bullets, numbered lists, spacing, and trees
function formatAiResponsePerfect(text: string): string {
  if (!text) return "";

  let formatted = String(text);

  // Normalize line breaks
  formatted = formatted.replace(/\r\n|\r/g, "\n");

  // Remove extra spaces at start/end of each line
  formatted = formatted
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  // Ensure numbered lists start on a new line
  formatted = formatted.replace(/(\d+)\.\s+/g, "\n$1. ");

  // Ensure bullets start on a new line
  formatted = formatted.replace(/\s*-\s+/g, "\n- ");

  // Fix folder tree code blocks
  if (/├──|└──/.test(formatted)) {
    formatted = "```\n" + formatted + "\n```";
  }

  // Remove multiple empty lines
  formatted = formatted.replace(/\n{2,}/g, "\n");

  return formatted.trim();
}

// Extract URLs safely
function extractUrls(text: any): { title: string; url: string }[] {
  if (!text) return [];
  const str = String(text);
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = str.match(urlRegex);
  if (!matches) return [];
  return matches.map((url) => ({ title: url, url }));
}

// Component to render source list
function SourceList({ sources }: { sources?: Message["sources"] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4">
      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
        <span className="text-base">📎</span> Sources
      </div>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li
            key={index}
            className="group relative flex items-center justify-between rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out"
          >
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 truncate text-sm text-blue-600 dark:text-blue-400 hover:underline"
              title={source.title ?? source.url}
            >
              {source.title ?? source.url}
            </a>
            <ExternalLink
              className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main message bubble component
export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);  
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Normalize Markdown, format AI response, wrap trees
  const normalizedText = normalizeMarkdownLinks(message.text);
  const formattedText = formatAiResponsePerfect(normalizedText);
  const sources = message.sources ?? extractUrls(normalizedText);

  // Handle empty text
  if (!message.text) {
    return <div className="text-white/50">No content to display</div>;
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className="max-w-[78%]">
        <div className={`flex items-end gap-1.5 ${isUser ? "flex-row-reverse" : ""}`}>
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm ${
                isUser ? "bg-[#4440C5]" : "bg-[#5967FF]"
              }`}
            >
              {isUser ? "U" : "AI"}
            </div>
          </div>

          {/* Chat Bubble */}
          <div className={`${isUser ? "text-right" : "text-left"} relative`}>
            <div
              className={`px-4 py-3 rounded-2xl shadow-sm ${
                isUser
                  ? "bg-[#4440C5] text-white"
                  : "bg-white/10 text-white backdrop-blur-md border border-white/20"
              }`}
            >
              <div className="prose prose-sm max-w-none prose-slate leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      />
                    ),
                  }}
                >
                  {formattedText}
                </ReactMarkdown>
              </div>
            </div>

            {/* Timestamp + Copy/Edit buttons */}
            <div className="flex justify-between items-center mt-1.5 gap-2 px-1">
              <div className="text-[11px] text-white/85">
                {format(new Date(message.ts), "p • MMM d")}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded hover:bg-white/5 relative"
                  title={copied ? "Copied!" : "Copy"}
                  aria-label={copied ? "Text copied" : "Copy text"}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-white" />
                  )}
                </button>
                {isUser && message.onEdit && (
                  <button
                    onClick={() => message.onEdit?.(message.text)}
                    className="p-1 rounded hover:bg-white/5"
                    title="Edit"
                    aria-label="Edit message"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Sources */}
            <SourceList sources={sources} />
          </div>
        </div>
      </div>
    </div>
  );
}