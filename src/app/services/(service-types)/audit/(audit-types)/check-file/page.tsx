import React from "react";
import { Metadata } from "next";
import CheckFile from "@/components/servicesPage/service-types/audit/CheckFile";

export const metadata: Metadata = {
  title: "Проверка файла",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px] flex items-center">
        <CheckFile />
      </div>
    </div>
  );
};
export default Page;
