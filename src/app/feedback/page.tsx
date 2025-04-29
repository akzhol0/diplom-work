import { Metadata } from "next";
import React from "react";
import Feedbacks from "@/components/feedback/Feedbacks";
import ChatBot from "@/components/chatBot/ChatBot";

export const metadata: Metadata = {
  title: "Отзывы",
};

function Profile() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <Feedbacks />
        <ChatBot />
      </div>
    </div>
  );
}

export default Profile;
