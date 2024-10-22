import React from 'react';
import Image from 'next/image';
import { cards } from '@/components/services/cards';
import CardComp from '@/components/main-page/CardComp';
import PortfolioContainer from '@/components/portfolio/PortfolioContainer';
import Link from 'next/link';
import Parallax from '@/components/main-page/Parallax';

function Main() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] md:w-[80%] flex flex-col">
        <div className="flex flex-col lg:flex-row justify-around gap-2">
          <div className="h-auto lg:h-[600px] flex flex-col gap-4 justify-center">
            <p className="text-[30px] sm:text-[40px] md:text-[60px] font-bold">
              Digital production team
            </p>
            <p className="text-[20px]">
              Мы занимаемся разработкой мобильных приложений, <br /> коммерческих сайтов, систем
              автоматизации и не только
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
          {cards.map((item) => (
            <CardComp key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center">
          <iframe
            width="900"
            height="506"
            src="https://www.youtube.com/embed/Gt8xiJyJ2Sc?autoplay=0&mute=1"></iframe>
        </div>
        <div className="flex flex-col gap-[20px] lg:gap-[50px] my-[50px]">
          <p className="text-[40px] lg:text-[50px] font-bold">Проекты</p>
          <p className="lg:text-lg">
            Создаем качественные и визуально привлекательные <br />
            цифровые продукты, которые помогают целям <br />
            бизнеса и идеям для стартапа
          </p>
          <PortfolioContainer filter="Промо" />
          <div className="flex justify-end">
            <Link href="/portfolio">
              <p className="text-lg text-red-600 cursor-pointer">Посмотреть все проекты</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
