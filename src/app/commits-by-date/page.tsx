import React from "react";
import { Metadata } from "next";
import Commits from "@/components/commits/Commits";

export const metadata: Metadata = {
  title: "Все обновления",
};

const Page = () => {
  return (
    <div className="flex justify-center">
      <Commits />
    </div>
  );
};

export default Page;
