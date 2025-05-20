"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mistral } from "@mistralai/mistralai";

const AiBot = () => {
  const [messages, setMessages] = useState<any>([
    {
      role: "assistant",
      content:
        "Привет, я искуственный интеллект этого веб-приложения. Если есть вопросы, можете задавать!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chatRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleInputChange = async () => {
    if (!input.trim()) return;
    if (loading) return;
    setLoading(true);

    setMessages((prev: any) => [...prev, { role: "user", content: input }]);
    setInput("");

    const apiKey = process.env.NEXT_PUBLIC_AI_API;
    const client = new Mistral({ apiKey });

    try {
      const chatResponse = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [...messages, { role: "user", content: input }],
      });

      const aiMessage = chatResponse.choices?.[0]?.message;
      if (aiMessage?.content) {
        setMessages((prev: any) => [
          ...prev,
          { role: "assistant", content: aiMessage.content },
        ]);
        setLoading(false);
      }
    } catch (error) {
      setMessages((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: "Произошла ошибка, пажалуйста попробуйте еще раз!",
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[700px] bg-white text-gray-800 flex flex-col">
      <header className="w-full p-4 border-b rounded-lg border-gray-800 text-lg whitespace-nowrap sm:text-2xl font-semibold text-center">
        Искуственный Интеллект - Brooklyn
      </header>
      <main
        ref={chatRef}
        className="flex-1 flex flex-col overflow-y-auto p-0 py-4 sm:p-6 space-y-4 h-[700px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        {messages.map((msg: any, index: any) => (
          <div
            key={index}
            className={`w-fit text-sm md:text-lg max-w-[80%] px-4 py-3 rounded-xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-auto bg-blue-100 font-normal animate-fade-in"
                : "mr-auto bg-gray-100 font-normal animate-fade-in"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="max-w-[60%] self-start text-md bg-gray-100 rounded-xl px-4 py-2 animate-pulse">
            Печатает...
          </div>
        )}
      </main>
      <footer className="w-full bg-white flex items-center gap-2 rounded-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInputChange()}
          placeholder="Сообщение писать сюда..."
          className="flex-1 p-2 sm:p-4 border rounded-lg text-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleInputChange}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-6 py-2 sm:py-4 rounded-lg text-md"
        >
          Отправить
        </button>
      </footer>
    </div>
  );
};

export default AiBot;
