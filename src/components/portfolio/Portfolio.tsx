'use client';

import React, { useState } from 'react';
import Options from './Options';
import PortfolioContainer from './PortfolioContainer';

function Portfolio() {
  const [filter, setFilter] = useState('');

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] xl:w-[60%] min-h-[800px] flex flex-col">
        <h1 className="text-[40px] md:text-[60px] font-semibold">Портфолио</h1>
        <div className="my-6">
          <Options setFilter={setFilter} />
        </div>
        <PortfolioContainer filter={filter} />
      </div>
    </div>
  );
}

export default Portfolio;
