import React, { useContext, useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import { contextData } from "@/components/context/context";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import { ru } from "@/components/language/ru";

type RiskResultProps = {
  result: string;
  setNextPage: (arg0: boolean) => void;
};

const RiskResult = ({ result, setNextPage }: RiskResultProps) => {
  const [mainLanguage, setMainLanguage] = useState<any>(ru);
  const [loaded, setLoaded] = useState(false);
  const [resultQuiver, setResultQuiver] = useState<any>();

  const findResult = () => {
    mainLanguage.riskAssessment.riskExamples.map((item: any) => {
      if (item.type === result) {
        setResultQuiver(item);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 5000);
    findResult();
  }, []);

  return loaded ? (
    <div>
      <p className="text-2xl md:text-3xl font-semibold text-center border-b py-4 border--600">
        Результаты оценки безопасности:
      </p>
      {resultQuiver && (
        <div className="mt-8">
          <p className="text-xl md:text-2xl font-medium animate-fade-in">
            {resultQuiver.title}
          </p>
          <p className="text-md md:text-justify md:text-lg mt-4 indent-10 animate-fade-in">
            {resultQuiver.description}
          </p>
          <ul className="gap-2 text-lg mt-4">
            <li className="font-medium text-xl mb-1 animate-fade-in">
              Рекомендаций:
            </li>
            {resultQuiver.recommendations.map((item: string, index: number) => (
              <li className="text-sm md:text-lg animate-fade-in" key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ul>
          <MyDangerButton
            className="mt-2 px-10"
            onClick={() => setNextPage(false)}
          >
            Назад
          </MyDangerButton>
        </div>
      )}
    </div>
  ) : (
    <LoadingUI />
  );
};

export default RiskResult;
