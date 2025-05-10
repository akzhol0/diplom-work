"use client";

import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import ServiceCard from "../servicesPage/ServiceCard";

function ServicesMainPage() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-[95%] md:w-[80%] flex flex-col my-8">
      <div className="flex flex-col gap-6 mb-10">
        <p className="text-[50px] md:text-[60px] font-bold">
          {mainLanguage.services.title}
        </p>
        <p className="text-[15px] md:text-[20px]">
          {mainLanguage.services.small2}
        </p>
      </div>
      <div className="flex flex-col gap-10 mt-5">
        <ServiceCard
          from="mainPage"
          item={mainLanguage.services.serviceCards[1]}
        />
      </div>
    </div>
  );
}

export default ServicesMainPage;
