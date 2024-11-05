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
      <ServicesMainPafe />
      <Information title={mainLanguage.mainPage.title3} small={mainLanguage.mainPage.small3} />
      <Iframe ytid="VEQd-jmVs44" />
      <p className="text-[20px] md:text-[30px] text-center text-black font-semibold mb-[10px] mt-[80px]">
        20 часто задаваемых вопросов про информационную безопасность
      </p>
      <div className="w-full min-h-[600px] flex justify-center bg-[#131313]">
        <Qa />
      </div>
      <div className="mt-[40px]">
        <p>Об разработчике</p>
      </div>
    </div>
  );
}

export default Main;
