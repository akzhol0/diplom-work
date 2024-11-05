'use client';

import React, { useContext, useEffect, useState } from 'react';
import { contextData } from '../context/context';
import './/qa-styles.css';
import { QuestionTypes } from '../types/types';

function Qa() {
  const { mainLanguage, languageChanger, questionChanger } = useContext(contextData);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionTypes>(
    mainLanguage.mainPage.questions[0],
  );

  useEffect(() => {
    setCurrentQuestion(mainLanguage.mainPage.questions[0]);
  }, [questionChanger]);

  return (
    <div className="w-[99%] lg:w-[80%] min-h-[600px] flex flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-[50%] max-h-[400px] md:max-h-[600px] overflow-y-scroll text-white">
        {mainLanguage.mainPage.questions.map((item: any) => (
          <div
            onClick={() => setCurrentQuestion(item)}
            className="flex items-center py-2 lg:py-0 min-h-[60px] cursor-pointer hover:bg-[#1b1b1b] transition-[.2s] rounded-lg ps-4">
            <div>
              {item.id}. {item.question}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[50%] min-h-[300px] flex flex-col items-center justify-center text-white gap-4">
        <p className="w-full text-start text-xl md:text-3xl font-semibold ps-4">
          {currentQuestion.id}. {currentQuestion.question}
        </p>
        <p className="w-full text-start text-base md:text-lg ps-4">{currentQuestion.answer}</p>
      </div>
    </div>
  );
}

export default Qa;
