import React from "react";
import { Metadata } from "next";
import CheckWebsite from "@/components/servicesPage/service-types/audit/CheckWebsite";

export const metadata: Metadata = {
  title: "Проверка сайта",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px] flex items-center">
        <CheckWebsite />
      </div>
    </div>
  );
};
export default Page;
