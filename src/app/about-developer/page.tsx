'use client'

// import { Metadata } from 'next';
import React from 'react';

// export const metadata: Metadata = {
//   title: 'Об разработчике',
// };

function Developer() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] min-h-[800px] flex flex-col">
        <p className="text-center text-3xl font-semibold">Об Разработчике</p>
      </div>
    </div>
  );
}

export default Developer;
