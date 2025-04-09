"use client";

import React, { useState } from "react";

const Page = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Привет! Я ChatGPT. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: input,
          }),
        },
      );

      const data = await res.json();
      const reply = data[0]?.generated_text || "Ошибка в ответе";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Произошла ошибка" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ChatGPT</h1>
      <div className="bg-white shadow rounded-xl p-4 h-[500px] overflow-y-auto flex flex-col gap-3 border">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-xl px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-100 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="self-start bg-gray-100 rounded-xl px-4 py-2 animate-pulse">
            ChatGPT печатает...
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <textarea
          rows={2}
          className="flex-1 p-2 rounded-xl border shadow resize-none"
          placeholder="Введите сообщение и нажмите Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={sendMessage}
          disabled={loading}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Page;
