import React, { useContext } from 'react';
import PortItem from './PortItem';
import { contextData } from '../context/context';

type PortfolioContainerProps = {
  filter: string;
};

function PortfolioContainer({ filter }: PortfolioContainerProps) {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {mainLanguage.projects.portfolioItems
        .filter((item: any) => item.type.includes(filter))
        .map((item: any) => (
          <PortItem key={item.id} item={item} />
        ))}
    </div>
  );
}

export default PortfolioContainer;
