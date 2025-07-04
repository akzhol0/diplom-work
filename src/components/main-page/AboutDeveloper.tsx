import Image from "next/image";
import React from "react";
import Link from "next/link";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";

const AboutDeveloper = () => {
  return (
    <div className="w-[95%] md:w-[80%] py-5 flex flex-col text-center">
      <p>
        Название темы: Разработка веб-приложения поддержки принятия решений по
        информационной безопасности
      </p>
      <p className="mb-4">
        Тақырыбы: Ақпараттық қауіпсіздік бойынша шешім қабылдайтын веб-қосымшаны
        өңдеу
      </p>
      <p>
        Тестовый сайт, сделанный для дипломной работы, разработчик Турсынханов
        Акжол, студент 4 курса университета ESIL University.
      </p>
      <div className="flex justify-center items-center gap-4">
        <p>Исходный код:</p>
        <a
          className="hover:scale-110 duration-200"
          href="https://github.com/akzhol0/diplom-work"
          target="_blank"
        >
          <Image
            src="/images/github-logo.png"
            width={40}
            height={40}
            alt="gh"
          />
        </a>
      </div>
      <div className="w-full flex flex-col items-center mt-8 gap-2">
        <p>Посмотреть все обновление (commits) веб-приложение по датам</p>
        <Link href={"/commits-by-date"}>
          <MyPrimaryButton>Прогресс проекта</MyPrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default AboutDeveloper;
