import React from 'react';
import { ServiceCardPropsTypes } from '../services/types';
import Link from 'next/link';
import PortItem from '../portfolio/PortItem';

type serviceCardsProps = {
  item: ServiceCardPropsTypes;
};

function ServiceCard({ item }: serviceCardsProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row justify-between">
      <div className="w-full md:w-[50%] flex flex-col">
        <p className="text-[25px] md:text-[30px] font-bold cursor-pointer hover:text-red-600 duration-300">
          {item.title}
        </p>
        <p className="mt-2 xl:mt-10">{item.description}</p>
        <p className="font-semibold mt-2">от {item.price} тенге</p>
        <Link href="/projects">
          <p className="cursor-pointer mt-4 text-red-600">
            Смотреть все {item.title.toLocaleLowerCase()}
          </p>
        </Link>
      </div>
      <div className="w-full md:w-[50%] flex justify-center">
        <div className="w-full">
          <PortItem item={item.card} />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
