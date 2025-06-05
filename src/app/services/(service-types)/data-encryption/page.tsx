import React from "react";
import { Metadata } from "next";
import Encryption from "@/components/servicesPage/service-types/data-encryption/Encryption";

export const metadata: Metadata = {
  title: "СППР по выбору метода шифрование",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <Encryption />
      </div>
    </div>
  );
};
export default Page;
