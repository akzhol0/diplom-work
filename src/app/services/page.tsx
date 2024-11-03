import ServiceComponent from '@/components/servicesPage/ServiceComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Услуги',
};

function Services() {
  return <ServiceComponent />;
}

export default Services;
