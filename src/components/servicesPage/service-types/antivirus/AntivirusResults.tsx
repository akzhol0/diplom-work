import React, { useContext, useEffect, useState } from "react";
import { questionTypes } from "@/components/types/types";
import Image from "next/image";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import { ru } from "@/components/language/ru";
import { Mistral } from "@mistralai/mistralai";
import { contextData } from "@/components/context/context";

type AntivirusResultsProps = {
  answers: questionTypes[];
  setNextStage: (arg0: boolean) => void;
};

const AntivirusResults = ({ answers, setNextStage }: AntivirusResultsProps) => {
  const [mainLanguage, setMainLanguage] = useState<any>(ru);

  const [finish, setFinish] = useState(false);
  const [pickedItemIndex, setPickedItemIndex] = useState(0);
  const [message, setMessage] = useState<any>("");
  const { isAuth, userInfo } = useContext(contextData);

  const answersInStrings = answers.map((item: any) => {
    return `${item.question}: ${item.answer}`;
  });

  function getResults() {
    const counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 10; i++) {
      let counterTemp = 0;

      mainLanguage.antivirusDataTypes[i].questionTypes.map(
        (questionType: any) => {
          answers.map((answerType: any) => {
            if (questionType.answer.includes(answerType.answer)) {
              counterTemp++;
            }
          });
        },
      );

      counter[i] = counterTemp;
    }

    calculate(counter);
  }

  const calculate = (numbers: number[]) => {
    const highest = Math.max(...numbers);

    numbers.find((number, index) => {
      if (highest === number) {
        setPickedItemIndex(index === 0 ? index : index - 1);
        getAnswersFromAi(index === 0 ? index : index - 1);
        return true;
      }
    });

    setTimeout(() => {
      setFinish(true);
    }, 3000);
  };

  const getAnswersFromAi = async (antivirusIndex: number) => {
    const apiKey = process.env.NEXT_PUBLIC_AI_API;
    const client = new Mistral({ apiKey });

    try {
      const prompt = `Пиши как специалист в допустим в торговом центру и тебе надо продать продукт,
      и Раскажи побольше информаций, желательно на 2 страницы ворд, об 
      этом антивирусе ${mainLanguage.antivirusDataTypes[antivirusIndex].title}. ${
        isAuth &&
        `Специально для пользователя под именем 
      ${userInfo.userName}`
      }. Вот выбор пользователя если нужно ${answersInStrings} и подойтет ли выбор для пользователя, 
      и ответь на каждый выбор пользователя и почему он подходит! и не пиши это "С уважением, 
      [Ваше имя] [Ваша должность] [Номер телефона] [Электронная почта]"`;

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
      console.log("AI request failed:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <p className="text-[20px] lg:text-[25px] font-semibold text-center mb-4">
        Результаты:
      </p>
      {finish ? (
        <>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="h-auto animate-fade-in xl:min-h-[600px] w-full lg:w-[30%] flex justify-center items-center border rounded-lg overflow-hidden">
              <Image
                width={500}
                height={600}
                src={mainLanguage.antivirusDataTypes[pickedItemIndex].image}
                alt={mainLanguage.antivirusDataTypes[pickedItemIndex].title}
              />
            </div>
            <div className="w-full lg:w-[70%] flex flex-col justify-between p-2 md:p-4 lg:p-8 animate-fade-in">
              <div className="">
                <p className="text-3xl font-semibold animate-fade-in">
                  {mainLanguage.antivirusDataTypes[pickedItemIndex].title}
                </p>
                <p className="pt-2 text-md lg:text-lg animate-fade-in">
                  {mainLanguage.antivirusDataTypes[pickedItemIndex].reason}
                </p>
              </div>
              <div className="w-full flex items-center mt-4 gap-2 animate-fade-in">
                <div className="w-full" onClick={() => setNextStage(true)}>
                  <MyDangerButton className="w-full">Назад</MyDangerButton>
                </div>
                <a
                  className="w-full"
                  href={`https://www.google.com/search?q=${mainLanguage.antivirusDataTypes[pickedItemIndex].title}`}
                  target="_blank"
                >
                  <MyPrimaryButton className="w-full">
                    Побольше информаций
                  </MyPrimaryButton>
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="p-2 md:p-4">
              {message !== "" ? (
                <div className="space-y-4">
                  <p className="text-xl text-center font-semibold mb-4">
                    Ответ от искуственного интеллекта:
                  </p>
                  <p className="text-3xl font-semibold mb-4">
                    {mainLanguage.antivirusDataTypes[pickedItemIndex].title}
                  </p>
                  <pre className="text-lg whitespace-pre-wrap font-sans leading-relaxed">
                    {message.split("\n").map((line: string, i: number) => {
                      if (line.startsWith("###")) {
                        return (
                          <h3 key={i} className="text-lg font-bold mt-4 mb-2">
                            {line.replace(/^###\s*/, "").replace(/\*\*/g, "")}
                          </h3>
                        );
                      }
                      return (
                        <p key={i} className="mb-2 whitespace-pre-line">
                          {line.replace(/\*\*/g, "")}
                        </p>
                      );
                    })}
                  </pre>
                </div>
              ) : (
                <LoadingUI />
              )}
            </div>
          </div>
        </>
      ) : (
        <LoadingUI />
      )}
    </div>
  );
};

export default AntivirusResults;
