import ServiceComponent from "@/components/servicesPage/ServiceComponent";
import { Metadata } from "next";
import ChatBot from "@/components/chatBot/ChatBot";
import UsersListModal from "@/components/usersModal/UsersListModal";
import React from "react";

export const metadata: Metadata = {
  title: "Услуги",
};

function Services() {
  return (
    <>
      <ServiceComponent />
      <ChatBot />
      <UsersListModal />
    </>
  );
}

export default Services;
