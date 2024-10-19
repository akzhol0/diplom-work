import React from 'react';
import { portfolioItems } from '../services/portfolio-items';
import PortItem from './PortItem';

type PortfolioContainerProps = {
  filter: string;
};

function PortfolioContainer({ filter }: PortfolioContainerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
      {portfolioItems
        .filter((item) => item.type.includes(filter))
        .map((item) => (
          <PortItem key={item.id} item={item} />
        ))}
    </div>
  );
}

export default PortfolioContainer;
