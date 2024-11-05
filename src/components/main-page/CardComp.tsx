import React from 'react';
import Image from 'next/image';
import { CardPropsTypes } from '../types/types';

type CardCompProps = {
  item: CardPropsTypes;
};

function CardComp({ item }: CardCompProps) {
  return (
    <div className="flex gap-2 lg:gap-6">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image src={item.img} width={100} height={100} alt="picture" />
        <p className="text-lg text-red-600 whitespace-nowrap">{item.title}</p>
        <p className="text-sm text-center">{item.description}</p>
      </div>
    </div>
  );
}

export default CardComp;
