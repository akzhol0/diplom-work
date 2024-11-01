import { serviceCards } from '@/components/services/serviceCards';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const ClientOnlyRequestComp = dynamic(() => import('@/components/footer/RequestComp'), {
  ssr: false,
});

const ClientOnlyServiceCard = dynamic(() => import('@/components/servicesPage/ServiceCard'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Услуги',
};

function Services() {
  return (
    <div className="w-full min-h-[800px] flex justify-center">
      <div className="w-[95%] md:w-[80%] xl:w-[60%] flex flex-col">
        <div className="flex flex-col gap-6 mb-10">
          <p className="text-[50px] md:text-[60px] font-bold">Услуги</p>
          <p className="text-[15px] md:text-[20px]">
            Мы ведем весь цикл разработки проекта и придерживаемся продуктового подхода в нашей
            работе. Если у вас есть идея, но вы не знаете, как ее реализовать, мы поможем вам.
          </p>
          <p className="text-[15px] md:text-[20px]">
            Наша команда вас проконсультирует, сделает анализ, выделит конкурентов и целевую
            аудиторию продукта. Дизайнеры сформируют пользовательские сценарии и создадут не только
            красивый, но и функциональный дизайн. А команда программистов разработает логику
            продукта и автоматизируют систему для более эффективного выполнения задач.
          </p>
        </div>
        <div className="flex flex-col gap-10 mt-5">
          {serviceCards.map((item) => (
            <ClientOnlyServiceCard item={item} />
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <ClientOnlyRequestComp />
        </div>
      </div>
    </div>
  );
}

export default Services;
