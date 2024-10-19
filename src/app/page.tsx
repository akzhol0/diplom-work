import React from 'react';
import Image from 'next/image';

function Main() {
  return (
    <div className="w-full min-h-[1000px] flex justify-center">
      <div className="w-[95%] md:w-[80%] h-[500px] mt-[50px] md:mt-0 flex flex-col lg:flex-row justify-around gap-2">
        <div className="h-[500px] flex flex-col gap-4 justify-center">
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
    </div>
  );
}

export default Main;
