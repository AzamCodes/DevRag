// // components/ChatInput.tsx
// "use client";

import React from "react";

// import React, { useCallback, useRef, useState } from "react";

// interface Props {
//   onSend: (text: string) => void;
//   loading?: boolean;
// }

// export default function ChatInput({ onSend, loading }: Props) {
//   const [text, setText] = useState("");
//   const inputRef = useRef<HTMLTextAreaElement | null>(null);

//   const submit = useCallback(
//     (e?: React.FormEvent) => {
//       e?.preventDefault();
//       if (!text.trim() || loading) return;
//       onSend(text);
//       setText("");
//     },
//     [text, onSend, loading]
//   );

//   return (
//     <form onSubmit={submit} className="max-w-5xl mx-auto flex items-end gap-3">
//       <textarea
//         ref={inputRef}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={1}
//         placeholder="Type your question... e.g. 'Explain Next.js routing simply'"
//         className="flex-1 resize-none px-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
//       />

//       <div className="flex items-center gap-2">
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-60 transition"
//         >
//           {loading ? "Thinking..." : "Send"}
//         </button>
//       </div>
//     </form>
//   );
// }
  // "use client";

  // import React, { useState } from "react";

  // type ChatInputProps = {
  //   onSend: (msg: string) => void;
  //   loading?: boolean;
  // };

  // export default function ChatInput({ onSend, loading }: ChatInputProps) {
  //   const [text, setText] = useState("");

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!text.trim() || loading) return;
  //     onSend(text.trim());
  //     setText("");
  //   };

  //   return (
  //     <form
  //       onSubmit={handleSubmit}
  //       className="flex items-center gap-2 bg-white dark:bg-amber-300  rounded-full border px-3 py-2 shadow-sm"
  //     >
  //       <input
  //         type="text"
  //         value={text}
  //         onChange={(e) => setText(e.target.value)}
  //         disabled={loading}
  //         placeholder={loading ? "Assistant is typing..." : "Type your message..."}
  //         className="flex-1 outline-none bg-transparent text-black dark:text-white text-sm  disabled:text-gray-400"
  //       />

  //       <button
  //         type="submit"
  //         disabled={loading || !text.trim()}
  //         className={`text-white text-sm px-4 py-2 rounded-full transition ${
  //           loading || !text.trim()
  //             ? "bg-gray-300 cursor-not-allowed"
  //             : "bg-blue-600 hover:bg-blue-700"
  //         }`}
  //       >
  //         {loading ? "..." : "Send"}
  //       </button>
  //     </form>
  //   );
  // }

import  { useRef, useEffect } from "react";

type ChatInputProps = {
  onSend: (msg: string) => void;
  loading?: boolean;
  value?: string;
  onChange?: (val: string) => void;
};

export default function ChatInput({ onSend, loading, value = "", onChange }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto"; // reset height
    ta.style.height = ta.scrollHeight + "px"; // set to scrollHeight
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!value.trim() || loading) return;
      onSend(value.trim());
      onChange?.("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim() || loading) return;
        onSend(value.trim());
        onChange?.("");
      }}
      className="flex items-center gap-2 bg-[#181818] rounded-xl border border-white/25 px-3 py-2 shadow-sm"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder={loading ? "Assistant is typing..." : "Type your message..."}
        className="flex-1 resize-none overflow-hidden bg-transparent outline-none text-gray-100 placeholder-gray-400 disabled:text-gray-500 text-sm"
        rows={1}
        style={{ lineHeight: 1.5, maxHeight: "200px" }} // optional max height
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className={`text-white text-sm px-4 py-2 rounded-xl ${
          loading || !value.trim()
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-[#5967FF]/95 hover:bg-[#5967FF]"
        }`}
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
}
