import Portfolio from "@/components/portfolio/Portfolio";
import { Metadata } from "next";
import React from "react";
import ChatBot from "@/components/chatBot/ChatBot";
import UsersListModal from "@/components/usersModal/UsersListModal";

export const metadata: Metadata = {
  title: "Проекты",
};

function Projects() {
  return (
    <>
      <Portfolio />
      <ChatBot />
      <UsersListModal />
    </>
  );
}

export default Projects;
