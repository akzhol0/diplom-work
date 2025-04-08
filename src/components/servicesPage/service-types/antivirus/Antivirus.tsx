"use client";

import React, { useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import AntiOptions from "@/components/servicesPage/service-types/antivirus/AntiOptions";

const Antivirus = () => {
  const [beginning, setBeginning] = useState(true);

  return (
    <div className="w-[95%] md:w-[80%]">
      {beginning ? (
        <>
          <p className="text-[30px] lg:text-[40px] font-semibold">
            Что это такое?
          </p>
          <div className="text-[14px] md:text-[20px] mt-4 text-justify indent-12">
            Система поддержки принятия решений (СППР) для выбора антивирусного
            программного обеспечения представляет собой программный инструмент,
            предназначенный для помощи пользователям в обоснованном и
            рациональном выборе наиболее подходящего антивируса в зависимости от
            их индивидуальных потребностей, технических условий и предпочтений.
            <br />
            <div className="indent-12">
              Основная цель СППР - снизить неопределенность и упростить выбор
              антивирусного решения. Алгоритм системы обрабатывает данные
              пользователя, такие как уровень защиты, производительность,
              совместимость, дополнительные функции и стоимость лицензии. СППР
              анализирует варианты антивирусов, используя базу знаний, включая
              тесты лабораторий (AV-Comparatives, AV-Test) и отзывы
              пользователей. Методами многокритериального анализа система
              оценивает и сравнивает альтернативы. Результатом является список
              рекомендованных решений, с пояснением их сильных и слабых сторон,
              а также соответствия требованиям пользователя.
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div onClick={() => setBeginning(!beginning)}>
              <MyPrimaryButton className="py-2 px-16 mt-8">
                Начать
              </MyPrimaryButton>
            </div>
          </div>
        </>
      ) : (
        <AntiOptions />
      )}
    </div>
  );
};

export default Antivirus;
