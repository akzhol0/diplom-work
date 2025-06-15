"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { contextData } from "@/components/context/context";
import Image from "next/image";
import { Mistral } from "@mistralai/mistralai";

const ChatBot = () => {
  const { isBotVisible, setIsBotVisible, mainLanguage } =
    useContext(contextData);

  const [messages, setMessages] = useState<any>([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [commands, setCommands] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {};

  const sendMessage = async (question: string, from: string) => {
    if (question === "" || loading) return;
    setLoading(true);

    setMessages((prev: any) => [
      ...prev,
      { role: "user", content: `${userMessage || question}` },
    ]);
    setUserMessage("");

    const apiKey = process.env.NEXT_PUBLIC_AI_API;
    const client = new Mistral({ apiKey });

    try {
      const chatResponse = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [
          ...messages,
          { role: "user", content: userMessage || question },
        ],
      });

      const aiMessage = chatResponse.choices?.[0]?.message;
      if (aiMessage?.content) {
        setMessages((prev: any) => [
          ...prev,
          { role: "assistant", content: aiMessage.content },
        ]);
      }
    } catch (error) {
      setMessages((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: "Произошла ошибка, пажалуйста попробуйте еще раз!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-30 relative">
      <div
        className={`h-[600px] fixed flex bottom-0 md:bottom-[50px] left-0 duration-300   ${
          isBotVisible ? "translate-x-0" : "-translate-x-[91%]"
        }`}
      >
        <div className={`flex flex-col ${isBotVisible && "shadow-2xl"}`}>
          <div className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-tr-xl">
            <h2 className="text-lg font-semibold">ИИ-ассистент</h2>
          </div>
          <div className="w-[350px] sm:w-[400px] h-[640px] flex flex-col p-4 overflow-y-auto space-y-4 bg-white">
            <pre
              className="w-fit text-sm font-semibold shadow-md max-w-[80%] px-4 py-3 rounded-xl font-sans
            leading-relaxed whitespace-pre-wrap mr-auto bg-gray-100 animate-fade-in"
            >
              Привет, я твой ассистент этого веб-приложения Mercury. Если есть
              вопросы можете меня спрашивать!
            </pre>
            {messages !== null &&
              messages.map((msg: any, index: any) => (
                <pre
                  key={index}
                  className={`w-fit text-sm font-semibold shadow-md max-w-[80%] px-4 py-3 rounded-xl font-sans 
            leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-auto bg-blue-100 animate-fade-in"
                : "mr-auto bg-gray-100 animate-fade-in"
            }`}
                >
                  {msg.content.replace(/^###\s*/, "").replace(/\*\*/g, "")}
                </pre>
              ))}
            {loading && (
              <div className="max-w-[60%] self-start text-md bg-gray-100 rounded-xl px-4 py-2 animate-pulse">
                Печатает...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="bg-white border-t flex items-center">
            {commands && (
              <div className="absolute left-0 bottom-[60px] w-[350px] sm:w-[400px] h-[250px] overflow-y-auto bg-gray-50">
                <div className="grid grid-cols-1 border-t-2 border-black">
                  {mainLanguage.chatBotQuestions.map(
                    (item: any, index: number) => (
                      <div
                        onClick={() => {
                          sendMessage(item.question, "userCommand");
                          setCommands(false);
                        }}
                        className={`text-sm cursor-pointer hover:bg-gray-200 p-4 ${index % 2 === 0 && "bg-gray-100"}`}
                      >
                        {index + 1}. {item.question}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
            <input
              type="text"
              placeholder={mainLanguage.leftOut.write}
              className="flex-1 border rounded-full m-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userMessage}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              onClick={() =>
                setCommands(mainLanguage.lang === "ru" && !commands)
              }
              className="bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-800 transition"
            >
              <Image src="/images/db.png" width={20} height={20} alt="logo" />
            </button>
            <button
              type={"submit"}
              onClick={() => sendMessage(userMessage, "userText")}
              className="mx-1 bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-800 transition"
            >
              ➤
            </button>
          </div>
        </div>
        <div className="h-full flex items-end">
          <button
            onClick={() => setIsBotVisible(!isBotVisible)}
            className="w-10 h-10 mb-[130px] md:mb-5 bg-blue-800 text-white px-4 rounded-tr-lg rounded-br-lg"
          >
            {isBotVisible ? "<" : ">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
