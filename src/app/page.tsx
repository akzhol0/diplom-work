'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { contextData } from '@/components/context/context';
import CardComp from '@/components/main-page/CardComp';
import Information from '@/components/main-page/Information';
import Parallax from '@/components/main-page/Parallax';
import Iframe from '@/components/main-page/Iframe';
import ProjectsMainPage from '@/components/main-page/ProjectsMainPage';
import ServicesMainPafe from '@/components/main-page/ServicesMainPafe';
import Qa from '@/components/main-page/Qa';

function Main() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] md:w-[80%] flex flex-col lg:flex-row justify-around gap-2">
        <Parallax
          title={mainLanguage.mainPage.parallax.title}
          small={mainLanguage.mainPage.parallax.small}
        />
        <div className="flex justify-center items-center">
          <Image
            priority={true}
            src="/images/laptop.png"
            width={500}
            height={500}
            alt="laptop picture"
          />
        </div>
      </div>
      <div className="w-full min-h-[400px] bg-[#f8f8f8] flex justify-center items-center">
        <div className="w-[95%] md:w-[80%] place-items-center gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 my-4">
          {mainLanguage.mainPage.cards.map((item: any) => (
            <CardComp key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Information title={mainLanguage.mainPage.title2} small={mainLanguage.mainPage.small2} />
      <Iframe ytid="Gt8xiJyJ2Sc" />
      <div className="w-[95%] md:w-[80%]">
        <ProjectsMainPage />
      </div>
      <p className="text-[20px] md:text-[30px] text-center text-black font-semibold mb-[10px] mt-[80px]">
        {mainLanguage.mainPage.questionLabel}
      </p>
      <div className="w-full min-h-[600px] flex justify-center bg-[#131313]">
        <Qa />
      </div>
      <ServicesMainPafe />
      <Information title={mainLanguage.mainPage.title3} small={mainLanguage.mainPage.small3} />
      <Iframe ytid="VEQd-jmVs44" />
      <div className="w-full flex justify-center mt-[40px]">
        <div className="w-[95%] md:w-[80%] py-5 flex flex-col items-center text-black ">
          <p>
            Тестовый сайт, сделанный для дипломной работы, разработчик Турсынхан Акжол, студент 4
            курса университета ESIL University.
          </p>
          <div className="flex items-center gap-4">
            <p>Исходный код:</p>

            <div className="hover:bg-[#ffdcb7] rounded-[50%] cursor-pointer duration-200">
              <a href="https://github.com/akzhol0/diplom-work" target="_blank">
                <Image src="/images/github-logo.png" width={40} height={40} alt="gh" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
