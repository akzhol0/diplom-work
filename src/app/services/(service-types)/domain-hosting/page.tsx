import React from "react";
import Domain from "@/components/servicesPage/service-types/domain-hosting/Domain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "СППР Домен и Хостинг",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <Domain />
      </div>
    </div>
  );
};

export default Page;
