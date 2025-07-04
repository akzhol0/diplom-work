"use client";

import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { contextData } from "@/components/context/context";
import CardComp from "@/components/main-page/CardComp";
import Information from "@/components/main-page/Information";
import Parallax from "@/components/main-page/Parallax";
import ProjectsMainPage from "@/components/main-page/ProjectsMainPage";
import ServicesMainPage from "@/components/main-page/ServicesMainPage";
import Qa from "@/components/main-page/Qa";
import AboutDeveloper from "@/components/main-page/AboutDeveloper";
import GoUpButton from "@/components/UI/my-buttons/go-up-button/GoUpButton";
import ChatBot from "@/components/chatBot/ChatBot";
import UsersListModal from "@/components/usersModal/UsersListModal";
import FeedbacksMainPage from "@/components/main-page/FeedbacksMainPage";
import UsedTech from "@/components/main-page/UsedTech";

function Main() {
  const { mainLanguage, isVisible, setIsVisible } = useContext(contextData);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setIsVisible(window.scrollY > 1000),
    );
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-[#ffffff]">
      <div className="w-[95%] md:w-[80%] flex flex-col lg:flex-row justify-around">
        <Parallax
          small={mainLanguage.mainPage.parallax.small}
          title={mainLanguage.mainPage.parallax.title}
          tryNow={mainLanguage.leftOut.tryNow}
        />
        <div className="flex justify-center items-center">
          <div className="rounded-xl overflow-hidden mb-4">
            <Image
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXFvaWprYmwwdXZ0NXhxanNpeTk1NWtkZGZkOGljZ2llcDZybDQ2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RDZo7znAdn2u7sAcWH/giphy.gif"
              priority={true}
              width={500}
              height={500}
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className="w-full min-h-[400px] bg-[#f8f8f8] flex justify-center items-center">
        <div className="w-[95%] md:w-[80%] gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ">
          {mainLanguage.mainPage.cards.map((item: any) => (
            <CardComp key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="pt-8">
        <video width="900" height="600" playsInline autoPlay loop muted>
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
      </div>
      <ServicesMainPage />
      <p className="text-[20px] md:text-[30px] text-center text-black font-semibold mt-[20px] md:mt-[60px]">
        {mainLanguage.mainPage.questionLabel}
      </p>
      <div className="w-full flex justify-center bg-[#131313]">
        <Qa />
      </div>
      <Information
        title={mainLanguage.mainPage.title3}
        small={mainLanguage.mainPage.small3}
      />
      <div className="w-[95%] md:w-[80%]">
        <ProjectsMainPage />
      </div>
      <video width="900" height="600" playsInline autoPlay loop muted>
        <source src="/videos/video2.mp4" type="video/mp4" />
      </video>
      <div className="w-full flex flex-col items-center my-8">
        <UsedTech />
      </div>
      <div className="w-full sm:w-[90%] lg:w-[80%]">
        <FeedbacksMainPage />
      </div>
      {/*<div className="w-full flex justify-center mt-[40px]">*/}
      {/*  <AboutDeveloper />*/}
      {/*</div>*/}
      {isVisible && <GoUpButton />}
      <ChatBot />
      <UsersListModal />
    </div>
  );
}

export default Main;
