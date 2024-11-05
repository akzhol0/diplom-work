'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { contextData } from '@/components/context/context';
import CardComp from '@/components/main-page/CardComp';
import PortfolioContainer from '@/components/portfolio/PortfolioContainer';

function Main() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] md:w-[80%] flex flex-col">
        <div className="flex flex-col lg:flex-row justify-around gap-2">
          <div className="h-auto lg:h-[600px] flex flex-col gap-4 justify-center">
            <p className="text-[30px] sm:text-[40px] md:text-[60px] font-bold">
              {mainLanguage.mainPage.parallax.title}
            </p>
            <p className="max-w-[600px] text-[18px] md:text-[20px]">
              {mainLanguage.mainPage.parallax.small}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Image
              priority={true}
              src="/images/laptop.png"
              width={400}
              height={400}
              alt="laptop picture"
            />
          </div>
        </div>
        <div className="w-full min-h-[500px] bg-[#fbfcfe] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 my-4">
          {mainLanguage.mainPage.cards.map((item: any) => (
            <CardComp key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center">
          <iframe
            width="900"
            height="506"
            src="https://www.youtube.com/embed/Gt8xiJyJ2Sc?autoplay=1&mute=1"></iframe>
        </div>
        <div className="flex flex-col gap-[20px] lg:gap-[50px] my-[50px]">
          <p className="text-[40px] lg:text-[50px] font-bold">
            {mainLanguage.mainPage.projects.title}
          </p>
          <p className="max-w-[500px]  lg:text-lg">{mainLanguage.mainPage.projects.small}</p>
          <PortfolioContainer filter="Промо" />
          <div className="flex justify-end">
            <Link href="/projects">
              <p className="text-lg text-red-600 cursor-pointer">
                {mainLanguage.mainPage.projects.linkTitle}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <p>Услуги</p>
      </div>
      <div className="">
        <p>Об разработчике</p>
      </div>
    </div>
  );
}

export default Main;
