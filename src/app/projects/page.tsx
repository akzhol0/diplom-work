import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

export const metadata: Metadata = {
  title: 'Проекты',
};

const ClientOnlyPortfolio = dynamic(() => import('@/components/portfolio/Portfolio'), {
  ssr: false,
});

function Projects() {
  return <ClientOnlyPortfolio />;
}

export default Projects;
