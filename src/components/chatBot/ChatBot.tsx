"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { contextData } from "@/components/context/context";
import Image from "next/image";

const ChatBot = () => {
  const { isBotVisible, setIsBotVisible, mainLanguage } =
    useContext(contextData);

  const [messages, setMessages] = useState([
    { role: "bot", content: "Привет! Я ЧатБот. Чем могу помочь?" },
  ]);

  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [commands, setCommands] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (question: string, from: string) => {
    if (question === "" || loading) return;
    setLoading(true);

    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setUserMessage("");

    setTimeout(() => {
      setLoading(false);
      if (from === "userText") {
        if (question.toLowerCase().includes("привет")) {
          setMessages([
            ...newMessages,
            { role: "bot", content: "Привет, как у тебя дела?" },
          ]);
        } else if (question.toLowerCase().includes("хорошо")) {
          setMessages([
            ...newMessages,
            {
              role: "bot",
              content:
                "Отлично, если есть вопросы по веб-приложению, то задавай используя готовые команды!",
            },
          ]);
        } else {
          setMessages([
            ...newMessages,
            {
              role: "bot",
              content:
                "Мои возможности ограничены, пажалуйста воспользуйтесь готовыми командами!",
            },
          ]);
        }
      } else {
        if (mainLanguage.lang === "ru") {
          mainLanguage.chatBotQuestions.map((item: any) => {
            if (item.question.toLowerCase().includes(question.toLowerCase())) {
              setMessages([
                ...newMessages,
                {
                  role: "bot",
                  content: item.answer,
                },
              ]);
            }
          });
        }
      }
    }, 2000);
  };

  return (
    <div className="z-30 relative">
      <div
        className={`h-[600px] fixed flex bottom-0 md:bottom-[50px] left-0 duration-300   ${
          isBotVisible ? "translate-x-0" : "-translate-x-[91%]"
        }`}
      >
        <div className="flex flex-col shadow-2xl ">
          <div className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-tr-xl">
            <h2 className="text-lg font-semibold">Чат Бот</h2>
          </div>
          <div className="w-[350px] sm:w-[400px] h-[640px] flex flex-col p-4 overflow-y-auto space-y-4 bg-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm rounded-xl px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-100 self-start"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="self-start text-sm bg-gray-100 rounded-xl px-4 py-2 animate-pulse">
                Бот печатает...
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
              placeholder="Написать..."
              className="flex-1 border rounded-full m-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userMessage}
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
            className="w-10 h-10 mb-[80px] md:mb-5 bg-blue-800 text-white px-4 rounded-tr-lg rounded-br-lg"
          >
            {isBotVisible ? "<" : ">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
