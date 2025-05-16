import { Metadata } from "next";
import React from "react";
import BotTest from "@/components/chatgpt_test/BotTest";

export const metadata: Metadata = {
  title: "test",
};

function Services() {
  return (
    <>
      <BotTest />
    </>
  );
}

export default Services;
