import React from "react";
import { Metadata } from "next";
import Password from "@/components/servicesPage/service-types/password-check/Password";

export const metadata: Metadata = {
  title: "СППР Надежности пароля",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px] flex justify-center">
        <Password />
      </div>
    </div>
  );
};

export default Page;
