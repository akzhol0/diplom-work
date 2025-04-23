import React from "react";
import { Metadata } from "next";
import QosAnal from "@/components/servicesPage/service-types/qos-analyze/QosAnal";

export const metadata: Metadata = {
  title: "СППР Анализ данных браузера",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <QosAnal />
      </div>
    </div>
  );
};
export default Page;
