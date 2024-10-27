'use client';

import React, { useState } from 'react';
import { options } from '../services/options';

type OptionsProps = {
  setFilter: (arg0: string) => void;
};

function Options({ setFilter }: OptionsProps) {
  const [activeOption, setActiveOption] = useState('');

  return (
    <div className="flex h-[60px]">
      <ul className="w-full flex text-[16px] md:text-[18px] gap-[40px] text-lg overflow-x-scroll md:overflow-x-hidden">
        {options.map((item) => (
          <li
            key={item}
            onClick={() => {
              setActiveOption(item);
              setFilter(item === 'Все' ? '' : item);
            }}
            className={
              '' + activeOption === item
                ? 'cursor-pointer text-gray-900 whitespace-nowrap'
                : 'cursor-pointer text-red-600 hover:text-gray-900 whitespace-nowrap'
            }>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Options;
