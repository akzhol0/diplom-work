import React from "react";
import { Metadata } from "next";
import Reservnoezaibalcopyrovanie from "@/components/servicesPage/service-types/resserv/Reservnoezaibalcopyrovanie";

export const metadata: Metadata = {
  title: "СППР для выбора инструмента резервного копирования",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <Reservnoezaibalcopyrovanie />
      </div>
    </div>
  );
};

export default Page;
