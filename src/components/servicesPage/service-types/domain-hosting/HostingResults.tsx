import React, { useContext, useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import { contextData } from "@/components/context/context";
import Image from "next/image";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import { ru } from "@/components/language/ru";
import { Mistral } from "@mistralai/mistralai";

type HostingResultsProps = {
  results: any;
  setResultsPage: (arg0: boolean) => void;
  domainName: string;
};

const HostingResults = ({
  results,
  setResultsPage,
  domainName,
}: HostingResultsProps) => {
  const [mainLanguage, setMainLanguage] = useState<any>(ru);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState<any>("");
  const { isAuth, userInfo } = useContext(contextData);

  const [pickedItemIndex, setPickedItemIndex] = useState(0);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    const counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 10; i++) {
      let counterTemp = 0;

      mainLanguage.hostingServiceData[i].questionAnswers.map(
        (questionType: any) => {
          results.map((answerType: any) => {
            if (questionType.answers.includes(answerType)) {
              counterTemp++;
            }
          });
        },
      );

      counter[i] = counterTemp;
    }
    calculate(counter);
  };

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
      setLoaded(true);
    }, 3000);
  };

  const getAnswersFromAi = async (hostingIndex: number) => {
    const apiKey = process.env.NEXT_PUBLIC_AI_API;
    const client = new Mistral({ apiKey });

    try {
      const prompt = `Раскажи побольше информаций, желательно на 2 страницы ворд, об 
      этом хостинг сервисе ${mainLanguage.hostingServiceData[hostingIndex].title} по 
      этому домен имени ${domainName}. ${
        isAuth &&
        `Специально для пользователя под именем 
      ${userInfo.userName}`
      } вот выбор пользователя если нужно ${results} и подойтет ли выбор для пользователя!`;

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

  return (
    <div>
      {loaded ? (
        <>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="animate-fade-in h-auto xl:min-h-[600px] w-full lg:w-[30%] flex justify-center items-center border rounded-lg overflow-hidden">
              <Image
                width={500}
                height={600}
                src={mainLanguage.hostingServiceData[pickedItemIndex].img}
                alt={mainLanguage.hostingServiceData[pickedItemIndex].title}
              />
            </div>
            <div className="w-full lg:w-[70%] flex flex-col justify-between p-2 md:p-4 lg:p-8">
              <div className="">
                <p className="text-3xl font-semibold animate-fade-in">
                  {mainLanguage.hostingServiceData[pickedItemIndex].title}
                </p>
                <p className="pt-2 text-md lg:text-lg animate-fade-in">
                  {mainLanguage.hostingServiceData[pickedItemIndex].reason}
                </p>
              </div>
              <div className="w-full flex items-center mt-4 gap-2 animate-fade-in">
                <div className="w-full" onClick={() => setResultsPage(false)}>
                  <MyDangerButton className="w-full">Назад</MyDangerButton>
                </div>
                <a
                  className="w-full animate-fade-in"
                  href={`https://www.google.com/search?q=${mainLanguage.hostingServiceData[pickedItemIndex].title}`}
                  target="_blank"
                >
                  <MyPrimaryButton className="w-full">
                    Побольше информаций
                  </MyPrimaryButton>
                </a>
              </div>
            </div>
          </div>
          {message !== "" ? (
            <div className="space-y-4">
              <p className="text-xl text-center font-semibold mb-4">
                Ответ от искуственного интеллекта:
              </p>
              <p className="text-3xl font-semibold mb-4">
                {mainLanguage.hostingServiceData[pickedItemIndex].title}
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
        </>
      ) : (
        <LoadingUI />
      )}
    </div>
  );
};

export default HostingResults;
