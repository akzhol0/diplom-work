import ServiceComponent from "@/components/servicesPage/ServiceComponent";
import { Metadata } from "next";
import ChatBot from "@/components/chatBot/ChatBot";

export const metadata: Metadata = {
  title: "Услуги",
};

function Services() {
  return (
    <>
      <ServiceComponent />
      <ChatBot />
    </>
  );
}

export default Services;
