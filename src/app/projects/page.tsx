import Portfolio from '@/components/portfolio/Portfolio';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Портфолио',
};

function Projects() {
  return <Portfolio />;
}

export default Projects;
