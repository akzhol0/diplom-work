"use client";

import React, { useContext } from "react";
import { contextData } from "../context/context";
import QuestionItself from "@/components/main-page/QuestionItself";

function Qa() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-[100%] lg:w-[80%] flex flex-col md:flex-row justify-center items-center">
      <div className="w-full min-h-[600px] text-white">
        {mainLanguage.mainPage.questions.map(
          (item: any) =>
            item.id <= 10 && <QuestionItself key={item.id} item={item} />,
        )}
      </div>
    </div>
  );
}

export default Qa;
