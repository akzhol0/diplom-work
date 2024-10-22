import React from 'react';
import Image from 'next/image';
import { PathPropsTypes } from '../services/types';

type PathCompProps = {
  item: PathPropsTypes;
  setCurrentCard: (arg0: PathPropsTypes) => void;
};

function PathComp({ item, setCurrentCard }: PathCompProps) {
  return (
    <div
      onClick={() => setCurrentCard(item)}
      className="flex flex-col gap-4 justify-between items-center cursor-pointer 
      rounded-lg hover:bg-[#ff5845] p-4 duration-[.5s]">
      <div className="w-[50px] h-[50px] flex">
        <Image src={item.img} width={50} height={50} alt="parallax" />
      </div>
      <p className="text-white">{item.title}</p>
    </div>
  );
}

export default PathComp;
