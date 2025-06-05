import React, { useContext, useEffect, useState } from "react";
import { Mistral } from "@mistralai/mistralai";
import { ru } from "../../../language/ru";
import { contextData } from "@/components/context/context";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";
import Image from "next/image";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import Link from "next/link";

type ResResultPageProps = {
  results: any;
  setResultPage: (arg0: boolean) => void;
};

const ResResultPage = ({ results, setResultPage }: ResResultPageProps) => {
  const [message, setMessage] = useState<any>(null);
  const { isAuth, userInfo } = useContext(contextData);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const typeExamples = ru.copyReserved.typeExamples;

  const answersInStrings = Object.values(results).map((item: any) => {
    return `${item.question}: ${item.answer}`;
  });

  const typesInStrings = typeExamples.map((item: any) => {
    return `${item.appName},`;
  });

  const getAnswersFromAi = async () => {
    const apiKey = process.env.NEXT_PUBLIC_AI_API;
    const client = new Mistral({ apiKey });

    try {
      const prompt = `Пажалуйста, дай ответ какой из этих приложений для резервного копирование ${typesInStrings}
      подходит пользователю ${isAuth ? `под именем ${userInfo.userName}` : ""}, по итогам ответа по вопросам, вопросы: 
      ${answersInStrings}. Выбери из приложений самый подходящий и напиши почему именно он подходит пользователю и ответь 
      на каждый вопрос, и пажалуйста побольше информаций понятным языком пользователю, с заключением и введением. Информация
      только по выбранному приложению и все`;

      const chatResponse = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const aiMessage = chatResponse.choices?.[0]?.message;
      if (aiMessage?.content) {
        setMessage(aiMessage.content);
        typeExamples.map((item: any) => {
          if (aiMessage.content?.includes(item.appName)) {
            setSelectedApp(item);
          }
        });
      }
    } catch (error) {
      console.error("AI request failed:", error);
    }
  };

  useEffect(() => {
    message === null && getAnswersFromAi();
  }, []);

  return (
    <div>
      <p className="text-center font-semibold text-3xl mb-6">Результаты</p>
      {selectedApp !== null && (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image
            className="rounded-xl animate-fade-in"
            src={selectedApp.image}
            width={600}
            height={600}
            alt="app logo"
          />
          <p className="text-2xl font-semibold animate-fade-in">
            {selectedApp.appName}
          </p>
        </div>
      )}
      {message !== null ? (
        <div>
          <pre className="whitespace-pre-wrap font-sans">
            {message.split("\n").map((line: string, i: number) => {
              if (line.startsWith("###")) {
                return (
                  <h3
                    key={i}
                    className="text-lg font-bold mt-4 mb-2 animate-fade-in"
                  >
                    {line.replace(/^###\s*/, "").replace(/\*\*/g, "")}
                  </h3>
                );
              }
              return (
                <p key={i} className="mb-2 whitespace-pre-line animate-fade-in">
                  {line.replace(/\*\*/g, "")}
                </p>
              );
            })}
          </pre>
          <MyDangerButton onClick={() => setResultPage(false)}>
            Назад
          </MyDangerButton>
        </div>
      ) : (
        <LoadingUi />
      )}
    </div>
  );
};

export default ResResultPage;
