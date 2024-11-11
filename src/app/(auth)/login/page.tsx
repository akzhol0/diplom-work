import LoginComponent from '@/components/auth/LoginComponent';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Войти в аккаунт',
};

function Login() {
  return <LoginComponent />;
}

export default Login;
