"use client";

export default function Message({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-purple-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
