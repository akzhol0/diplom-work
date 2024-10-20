import Portfolio from '@/components/portfolio/Portfolio';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Портфолио',
};

function PortfolioPage() {
  return <Portfolio />;
}

export default PortfolioPage;
