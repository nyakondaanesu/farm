"use client";
import { useEffect, useState } from "react";

export default function MessagesHome() {
  interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    analysis?: string; // Add optional analysis field
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []);

  const analyzeMessage = async (id: string, message: string) => {
    // Set loading state for this specific message
    setLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await fetch("/api/aimessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Please analyze this message and provide insights: "${message}"`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the message with the analysis
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === id ? { ...msg, analysis: data.response } : msg
          )
        );
      } else {
        console.error("Analysis failed:", data.error);
      }
    } catch (error) {
      console.error("Error analyzing message:", error);
    } finally {
      // Clear loading state for this message
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg._id} className="p-4 bg-gray-100 rounded shadow">
            <div className="mb-3">
              <p>
                <strong>Name:</strong> {msg.name}
              </p>
              <p>
                <strong>Email:</strong> {msg.email}
              </p>
              <p>
                <strong>Message:</strong> {msg.message}
              </p>
            </div>

            <button
              onClick={() => analyzeMessage(msg._id, msg.message)}
              disabled={loading[msg._id]}
              className={`px-4 py-2 rounded text-white ${
                loading[msg._id]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading[msg._id] ? "Analyzing..." : "Analyze Message"}
            </button>

            {msg.analysis && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="font-bold text-lg mb-2">AI Analysis:</h3>
                <div className="whitespace-pre-wrap">{msg.analysis}</div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {messages.length === 0 && (
        <p className="text-gray-500 italic">No messages found.</p>
      )}
    </div>
  );
}
