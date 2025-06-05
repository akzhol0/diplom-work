import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import { Mistral } from "@mistralai/mistralai";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";

type EncResultPageProps = {
  results: any;
  setResultPage: (arg0: boolean) => void;
};

const EncResultPage = ({ results, setResultPage }: EncResultPageProps) => {
  const [message, setMessage] = useState<any>(null);
  const { isAuth, userInfo } = useContext(contextData);

  const answersInStrings = Object.values(results).map((item: any) => {
    return `${item.question}: ${item.answer}`;
  });

  const getAnswersFromAi = async () => {
    const apiKey = process.env.NEXT_PUBLIC_AI_API;
    const client = new Mistral({ apiKey });

    try {
      const prompt = `Выбери наилучший метод шифрования по итогам этого опроса пользователя ${isAuth ? userInfo.userName : ""}, 
      вот вопросы и ответы "${answersInStrings.join(", ")}" и надо побольше информаций и простым языком, отвечая на
      каждый вопрос и комментирую почему метод именно подходит и как шифровать эти данные этим способом, будь специалистом 
      в этой сфере. Побольше информаций с введением и заключаением.`;

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
      }
    } catch (error) {
      console.error("AI request failed:", error);
    }
  };

  useEffect(() => {
    message === null && getAnswersFromAi();
  }, []);

  return message !== null ? (
    <div>
      <p className="text-3xl font-semibold text-center">Результаты:</p>
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
  );
};

export default EncResultPage;
