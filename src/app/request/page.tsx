'use client'

//import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

// export const metadata: Metadata = {
//   title: 'Оставить заявку',
// };

const ClientOnlyRequestComp = dynamic(() => import('@/components/footer/RequestComp'), {
  ssr: false,
});

function RequestPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] lg:w-[60%] flex justify-center">
        <ClientOnlyRequestComp />
      </div>
    </div>
  );
}

export default RequestPage;
