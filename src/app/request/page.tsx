import RequestComp from '@/components/footer/RequestComp';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Оставить заявку',
};

function RequestPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] lg:w-[60%] flex justify-center">
        <RequestComp />
      </div>
    </div>
  );
}

export default RequestPage;
