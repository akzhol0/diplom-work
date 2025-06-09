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
        <div className="flex flex-col gap-6 mb-4">
          <p className="text-[50px] md:text-[60px] font-bold">
            {mainLanguage.services.title}
          </p>
          <p className="text-[15px] md:text-[20px]">
            {mainLanguage.services.small1}
          </p>
          <div className="text-[15px] md:text-[20px]">
            {mainLanguage.services.small2}
            {mainLanguage.lang === "kz" && (
              <p className="text-gray-600 text-sm">
                *Өкінішке орай, жүйелер тек орыс тілінде жасалған, болашақта бұл
                жағдайды түзетеміз.*
              </p>
            )}
            {mainLanguage.lang === "en" && (
              <p className="text-gray-600 text-sm">
                *Unfortunately, the systems are currently available only in
                Russian, but we will fix this in the future.*
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-5">
          <p className="text-center text-black font-semibold text-2xl md:text-3xl mb-0 md:mb-4">
            1. Интеллектуальные СППР
          </p>
          {ruLanguage.services.serviceCards
            .filter((item: any) => item.type === "ai")
            .map((item: any) => (
              <ServiceCard from="notMainPage" key={item.id} item={item} />
            ))}
          <p className="text-center font-semibold text-2xl md:text-3xl mb-0 md:mb-4 pt-2 border-black">
            2. СППР по пользовательским данным
          </p>
          {ruLanguage.services.serviceCards
            .filter((item: any) => item.type === "dss")
            .map((item: any) => (
              <ServiceCard from="notMainPage" key={item.id} item={item} />
            ))}
          <p className="text-center font-semibold text-2xl md:text-3xl mb-0 md:mb-4 pt-2 border-black">
            3. Данных-ориентированные СППР
          </p>
          {ruLanguage.services.serviceCards
            .filter((item: any) => item.type === "analyze")
            .map((item: any) => (
              <ServiceCard from="notMainPage" key={item.id} item={item} />
            ))}
          <p className="text-center font-semibold text-2xl md:text-3xl mb-0 md:mb-4 pt-2 border-black">
            4. СППР но надежности системы
          </p>
          {ruLanguage.services.serviceCards
            .filter((item: any) => item.type === "security")
            .map((item: any) => (
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
