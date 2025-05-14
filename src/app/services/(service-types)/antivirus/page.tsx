import React from "react";
import { Metadata } from "next";
import Antivirus from "@/components/servicesPage/service-types/antivirus/Antivirus";

export const metadata: Metadata = {
  title: "СППР Антивирусы",
};

const Page = () => {
  return (
    <div className="w-full min-h-[600px] flex justify-center">
      <Antivirus />
    </div>
  );
};

export default Page;
