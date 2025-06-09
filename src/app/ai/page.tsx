import { Metadata } from "next";
import React from "react";
import AiBot from "@/components/servicesPage/service-types/ai_bot/AiBot";

export const metadata: Metadata = {
  title: "Искуственный интеллект",
};

function Profile() {
  return (
    <div className="w-full min-h-[300px] flex justify-center">
      <div className="w-[95%] md:w-[80%] h-auto flex justify-center items-center sm:items-start">
        <AiBot />
      </div>
    </div>
  );
}

export default Profile;
