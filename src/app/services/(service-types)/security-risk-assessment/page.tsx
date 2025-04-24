import React from "react";
import { Metadata } from "next";
import RiskCheck from "@/components/servicesPage/service-types/risk-assesment/RiskCheck";

export const metadata: Metadata = {
  title: "СППР Оценка безопасности",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <RiskCheck />
      </div>
    </div>
  );
};

export default Page;
