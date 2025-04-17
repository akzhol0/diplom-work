import React from "react";
import { Metadata } from "next";
import Analyze from "@/components/servicesPage/service-types/database-analyze/Analyze";

export const metadata: Metadata = {
  title: "СППР Анализ больших данных",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <Analyze />
      </div>
    </div>
  );
};
export default Page;
