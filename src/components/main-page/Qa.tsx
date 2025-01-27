"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "../context/context";
import { QuestionTypes } from "../types/types";
import MyArrow from "@/components/UI/icons/my-arrow/MyArrow";
import GoUpButton from "@/components/UI/my-buttons/go-up-button/GoUpButton";
import MyArrowUp from "@/components/UI/icons/my-arrow/MyArrowUp";
import QuestionItself from "@/components/main-page/QuestionItself";

function Qa() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-[100%] lg:w-[80%] flex flex-col md:flex-row justify-center items-center">
      <div className="w-full h-[600px] overflow-y-scroll text-white">
        {mainLanguage.mainPage.questions.map((item: any) => (
          <QuestionItself key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Qa;
