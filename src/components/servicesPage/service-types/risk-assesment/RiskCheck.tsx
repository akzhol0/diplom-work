"use client";

import React, { useContext, useState } from "react";
import { contextData } from "@/components/context/context";
import SingleItemRiskPage from "@/components/servicesPage/service-types/risk-assesment/SingleItemRiskPage";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import RiskResult from "@/components/servicesPage/service-types/risk-assesment/RiskResult";

const RiskCheck = () => {
  const { mainLanguage } = useContext(contextData);
  const [userAnswerCounter, setUserAnswerCounter] = useState<number>(0);
  const [error, setError] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (userAnswerCounter < 10) {
      setError("Пажалуйста ответьте хоть на несколько вопросов!");
      return;
    }

    function calculateRiskLevel(totalScore: number): string {
      if (totalScore <= 15) return "s-high";
      if (totalScore <= 25) return "high";
      if (totalScore <= 35) return "mid";
      if (totalScore <= 44) return "low";
      return "s-low";
    }

    setResult(calculateRiskLevel(userAnswerCounter));
    setNextPage(true);
  };

  return nextPage ? (
    <div>
      <RiskResult result={result} />
    </div>
  ) : (
    <div>
      <p className="text-2xl md:text-3xl font-semibold text-center border-t py-4 mt-4 border-gray-600">
        Оценка уровня безопасности
      </p>
      <div className="flex flex-col">
        {mainLanguage.riskAssessment.riskQuestions.map(
          (item: any, index: number) => (
            <SingleItemRiskPage
              setUserAnswerCounter={setUserAnswerCounter}
              userAnswerCounter={userAnswerCounter}
              key={index}
              item={item}
            />
          ),
        )}
        <div onClick={() => handleSubmit()} className="mx-auto mt-4">
          <MyPrimaryButton>Продолжить</MyPrimaryButton>
        </div>
        <p className="text-center text-red-600 mt-2">{error}</p>
      </div>
    </div>
  );
};

export default RiskCheck;
