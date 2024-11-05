'use client';

import React, { useContext } from 'react';
import { contextData } from '@/components/context/context';
import ServiceCard from './ServiceCard';
import RequestComp from '../footer/RequestComp';

function ServiceComponent() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-full min-h-[800px] flex justify-center">
      <div className="w-[95%] md:w-[80%] xl:w-[60%] flex flex-col">
        <div className="flex flex-col gap-6 mb-10">
          <p className="text-[50px] md:text-[60px] font-bold">{mainLanguage.services.title}</p>
          <p className="text-[15px] md:text-[20px]">{mainLanguage.services.small1}</p>
          <p className="text-[15px] md:text-[20px]">{mainLanguage.services.small2}</p>
        </div>
        <div className="flex flex-col gap-10 mt-5">
          {mainLanguage.services.serviceCards.map((item: any) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <RequestComp />
        </div>
      </div>
    </div>
  );
}

export default ServiceComponent;