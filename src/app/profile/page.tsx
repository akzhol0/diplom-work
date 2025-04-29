import ProfileComp from "@/components/profile/ProfileComp";
import { Metadata } from "next";
import React from "react";
import ChatBot from "@/components/chatBot/ChatBot";

export const metadata: Metadata = {
  title: "Профиль",
};

function Profile() {
  return (
    <div className="w-full min-h-[700px] flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <ProfileComp />
        <ChatBot />
      </div>
    </div>
  );
}

export default Profile;
