import { Metadata } from "next";
import React from "react";
import ChatBot from "@/components/chatBot/ChatBot";
import Forum from "@/components/forum/Forum";

export const metadata: Metadata = {
  title: "Форум",
};

function Profile() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <Forum />
        <ChatBot />
      </div>
    </div>
  );
}

export default Profile;
