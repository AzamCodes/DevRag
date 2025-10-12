// export interface RAGResponse {
//   response: string;
//   error?: string;
// }

// export async function askRAG(query: string): Promise<string> {
//   try {
//     const res = await fetch("http://localhost:8000/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error: ${res.status}`);
//     }

//     const data: RAGResponse = await res.json();
//     return data.response || "No response found.";
//   } catch (err) {
//     console.error("❌ askRAG error:", err);
//     return "An error occurred while fetching the response.";
//   }
// }


// lib/api.ts
export interface RAGResponse {
  response: string;
  sources?: { title?: string; url?: string }[];
  error?: string;
}

export async function askRAG(query: string): Promise<RAGResponse> {
  try {
    const res = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data: RAGResponse = await res.json();
    console.log("✅ askRAG response:", data);
    return data;
  } catch (err) {
    console.error("❌ askRAG error:", err);
    return { response: "An error occurred while fetching the response." };
  }
}
