import { contextData } from "@/components/context/context";

import React, { useContext, useState } from "react";
import MyArrowUp from "@/components/UI/icons/my-arrow/MyArrowUp";

type QuestionItselfProps = {
  item: any;
};

const QuestionItself = ({ item }: QuestionItselfProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { mainLanguage } = useContext(contextData);

  return (
    <div
      key={item.id}
      onClick={() => setIsSelected(!isSelected)}
      className="flex items-center lg:py-0 min-h-[60px] cursor-pointer hover:bg-[#1b1b1b] transition-[.2s] rounded-lg md:ps-4"
    >
      <div
        className={`relative w-full flex flex-col gap-2 px-8 py-4 transition-all duration-200 ease-in-out overflow-hidden
        ${isSelected ? "min-h-[200px] sm:min-h-[120px]" : "min-h-[0px]"}`}
      >
        <div className=" w-full flex justify-between">
          <p>
            {item.id}. {item.question}
          </p>
          <div
            className={`w-[25px] duration-200 h-[25px] cursor-pointer ${isSelected && "rotate-180"}`}
          >
            <MyArrowUp />
          </div>
        </div>
        <div
          className={`absolute bottom-0 md:bottom-4 duration-500 ${isSelected ? "opacity-100" : "opacity-0"}`}
        >
          {mainLanguage.rest.answer}: {item.answer}
        </div>
      </div>
    </div>
  );
};

export default QuestionItself;
