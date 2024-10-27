import React from 'react';
import Image from 'next/image';
import { PortItemPropsTypes } from '../services/types';

type PortItemProps = {
  item: PortItemPropsTypes;
};

function PortItem({ item }: PortItemProps) {
  return (
    <div
      className={`h-[250px] rounded-xl ${item.backgroundColor} overflow-hidden cursor-pointer duration-200 hover:scale-105`}>
      <div className="pt-5 ps-5">
        <p className="text-2xl font-semibold">{item.title}</p>
        <p className="w-[200px] text-sm">{item.description}</p>
      </div>
      <div className="w-full flex justify-end">
        <Image src="/images/phone.png" width={120} height={50} alt="phone png" />
      </div>
    </div>
  );
}

export default PortItem;
