"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import ServiceCard from "./ServiceCard";
import RequestComp from "../footer/RequestComp";
import GoUpButton from "@/components/UI/my-buttons/go-up-button/GoUpButton";
import { ru } from "../language/ru";

function ServiceComponent() {
  const { mainLanguage, isVisible, setIsVisible } = useContext(contextData);
  const [ruLanguage, setRuLanguage] = useState<any>(ru);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setIsVisible(window.scrollY > 1000),
    );
  }, []);

  return (
    <div className="w-full min-h-[800px] flex justify-center">
      <div className="w-[95%] lg:w-[70%] flex flex-col">
        <div className="flex flex-col gap-6 mb-10">
          <p className="text-[50px] md:text-[60px] font-bold">
            {mainLanguage.services.title}
          </p>
          <p className="text-[15px] md:text-[20px]">
            {mainLanguage.services.small1}
          </p>
          <p className="text-[15px] md:text-[20px]">
            {mainLanguage.services.small2}
          </p>
        </div>
        <div className="flex flex-col gap-10 mt-5">
          {ruLanguage.services.serviceCards.map((item: any) => (
            <ServiceCard from="notMainPage" key={item.id} item={item} />
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <RequestComp />
        </div>
      </div>
      {isVisible && <GoUpButton />}
    </div>
  );
}

export default ServiceComponent;
