import { Metadata } from "next";
import React from "react";
import Feedbacks from "@/components/feedback/Feedbacks";
import ChatBot from "@/components/chatBot/ChatBot";
import UsersListModal from "@/components/usersModal/UsersListModal";

export const metadata: Metadata = {
  title: "Отзывы",
};

function Profile() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <Feedbacks />
        <ChatBot />
        <UsersListModal />
      </div>
    </div>
  );
}

export default Profile;
