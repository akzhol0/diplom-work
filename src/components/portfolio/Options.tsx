"use client";

import React, { useContext, useState } from "react";
import { contextData } from "../context/context";

type OptionsProps = {
  setFilter: (arg0: string) => void;
};

function Options({ setFilter }: OptionsProps) {
  const { mainLanguage } = useContext(contextData);
  const [activeOption, setActiveOption] = useState<string>(
    mainLanguage.projects.options[0].filterBy,
  );

  return (
    <div className="flex h-[60px]">
      <ul className="w-full flex text-[16px] md:text-[18px] gap-[30px] text-lg overflow-x-scroll">
        {mainLanguage.projects.options.map((item: any) => (
          <li
            key={item.title}
            onClick={() => {
              setActiveOption(item.filterBy);
              setFilter(
                item.filterBy === mainLanguage.projects.options[0].filterBy
                  ? ""
                  : item.filterBy,
              );
            }}
            className={
              "" + activeOption === item.filterBy
                ? "cursor-pointer text-gray-900 whitespace-nowrap"
                : "cursor-pointer text-red-600 hover:text-gray-900 whitespace-nowrap"
            }
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Options;
