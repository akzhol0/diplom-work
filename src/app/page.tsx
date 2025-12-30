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
import YandexMap from "@/components/main-page/YandexMap";

function Main() {
  const { mainLanguage, isVisible, setIsVisible } = useContext(contextData);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setIsVisible(window.scrollY > 1000),
    );
  }, []);

  return (
    <div className="flex w-full flex-col items-center bg-[#ffffff]">
      <div className="flex w-[95%] flex-col justify-around md:w-[80%] lg:flex-row">
        <Parallax
          small={mainLanguage.mainPage.parallax.small}
          title={mainLanguage.mainPage.parallax.title}
          tryNow={mainLanguage.leftOut.tryNow}
        />
        <div className="flex items-center justify-center">
          <div className="mb-4 overflow-hidden rounded-xl">
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
      <div className="flex min-h-[400px] w-full items-center justify-center bg-[#f8f8f8]">
        <div className="grid w-[95%] grid-cols-1 gap-4 sm:grid-cols-2 md:w-[80%] xl:grid-cols-4">
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
      <p className="mt-[20px] text-center text-[20px] font-semibold text-black md:mt-[60px] md:text-[30px]">
        {mainLanguage.mainPage.questionLabel}
      </p>
      <div className="flex w-full justify-center bg-[#131313]">
        <Qa />
      </div>
      <div className="m-4 p-2 bg-gray-100 rounded-lg text-md md:text-lg">
        <div className="ps-4 flex items-center">
          Прикинь, в твоей жизни произошло столько событий, столько всего должно
          было произойти, чтобы ты именно сейчас читал это сообщение, ну что ты
          здесь забыл?
        </div>
      </div>
      <Information
        title={mainLanguage.mainPage.title3}
        small={mainLanguage.mainPage.small3}
      />
      <div className="w-[95%] md:w-[80%]">
        <ProjectsMainPage />
      </div>
      {/*<YandexMap />*/}
      <video width="900" height="600" playsInline autoPlay loop muted>
        <source src="/videos/video2.mp4" type="video/mp4" />
      </video>
      <div className="my-8 flex w-full flex-col items-center">
        <UsedTech />
      </div>
      <div className="w-full sm:w-[90%] lg:w-[80%]">
        <FeedbacksMainPage />
      </div>
      <div className="w-full flex justify-center mt-[40px]">
        <AboutDeveloper />
      </div>

      {isVisible && <GoUpButton />}
      <ChatBot />
      <UsersListModal />
    </div>
  );
}

export default Main;
