"use client";

import React, { useState } from "react";
import SingleItemRiskPage from "@/components/servicesPage/service-types/risk-assesment/SingleItemRiskPage";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import RiskResult from "@/components/servicesPage/service-types/risk-assesment/RiskResult";
import { ru } from "@/components/language/ru";

const RiskCheck = () => {
  const [mainLanguage, setMainLanguage] = useState<any>(ru);
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
      <RiskResult setNextPage={setNextPage} result={result} />
    </div>
  ) : (
    <div>
      <p className="text-2xl md:text-3xl font-semibold text-center py-2">
        Оценка уровня безопасности
      </p>
      <div className="flex flex-col items-center">
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
