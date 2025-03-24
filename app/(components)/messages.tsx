"use client";
import { useEffect, useState } from "react";

export default function MessagesHome() {
  interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg._id} className="p-4 bg-gray-100 rounded shadow">
            <p>
              <strong>Name:</strong> {msg.name}
            </p>
            <p>
              <strong>Email:</strong> {msg.email}
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
