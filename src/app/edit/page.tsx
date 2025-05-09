import React from "react";
import EditPage from "@/components/edit/EditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Редактировать",
};

const Page = () => {
  return (
    <div className="flex justify-center">
      <EditPage />
    </div>
  );
};

export default Page;
