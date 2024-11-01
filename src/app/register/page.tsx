import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

export const metadata: Metadata = {
  title: 'Регистрация',
};

const ClientOnlyRegisterComponent = dynamic(() => import('@/components/auth/RegisterComponent'), {
  ssr: false,
});

function Register() {
  return <ClientOnlyRegisterComponent />;
}

export default Register;
