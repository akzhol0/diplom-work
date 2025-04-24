import React, { useContext, useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import { contextData } from "@/components/context/context";

type RiskResultProps = {
  result: string;
};

const RiskResult = ({ result }: RiskResultProps) => {
  const { mainLanguage } = useContext(contextData);
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
          <p className="text-xl md:text-2xl font-medium">
            {resultQuiver.title}
          </p>
          <p className="text-md md:text-justify md:text-lg mt-4 indent-10">
            {resultQuiver.description}
          </p>
          <ul className="gap-2 text-lg mt-4">
            <li className="font-medium text-xl mb-1">Рекомендаций:</li>
            {resultQuiver.recommendations.map((item: string, index: number) => (
              <li className="text-sm md:text-lg" key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <LoadingUI />
  );
};

export default RiskResult;
