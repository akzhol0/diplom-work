import React from 'react';
import Image from 'next/image';
import { CardPropsTypes } from '../services/types';

type CardCompProps = {
  item: CardPropsTypes;
};

function CardComp({ item }: CardCompProps) {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-2 lg:gap-6">
      <Image src={item.img} width={100} height={100} alt="picture" />
      <p className="text-lg text-red-600">{item.title}</p>
      <p className="text-sm text-center">{item.description}</p>
    </div>
  );
}

export default CardComp;
