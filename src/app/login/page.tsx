import { Metadata } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Войти в аккаунт',
};

const ClientOnlyLoginComponents = dynamic(() => import('@/components/auth/LoginComponent'), {
  ssr: false,
});

function Login() {
  return <ClientOnlyLoginComponents />;
}

export default Login;
