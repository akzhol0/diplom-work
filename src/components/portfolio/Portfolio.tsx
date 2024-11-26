"use client";

import React, { useContext, useEffect, useState } from "react";
import Options from "./Options";
import PortfolioContainer from "./PortfolioContainer";
import { contextData } from "../context/context";
import GoUpButton from "@/components/UI/my-buttons/go-up-button/GoUpButton";

function Portfolio() {
  const { mainLanguage, isVisible, setIsVisible } = useContext(contextData);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setIsVisible(window.scrollY > 1000),
    );
  }, [window.scrollY]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] xl:w-[60%] min-h-[800px] flex flex-col">
        <h1 className="text-[40px] md:text-[60px] font-semibold">
          {mainLanguage.projects.title}
        </h1>
        <div className="my-6">
          <Options setFilter={setFilter} />
        </div>
        <PortfolioContainer filter={filter} />
      </div>
      {isVisible && <GoUpButton />}
    </div>
  );
}

export default Portfolio;
