import ProfileComp from "@/components/profile/ProfileComp";
import { Metadata } from "next";
import React from "react";
import ChatBot from "@/components/chatBot/ChatBot";
import UsersListModal from "@/components/usersModal/UsersListModal";

export const metadata: Metadata = {
  title: "Профиль",
};

function Profile() {
  return (
    <div className="w-full min-h-[700px] flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <ProfileComp />
        <ChatBot />
        <UsersListModal />
      </div>
    </div>
  );
}

export default Profile;
