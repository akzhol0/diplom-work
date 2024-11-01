'use client';

import React, { useContext, useState } from 'react';
import MyButtonDanger from '../UI/MyButtonDanger';
import Link from 'next/link';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { contextData } from '../context/context';

function LoginComponent() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { checkIfUserLogged } = useContext(contextData);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        localStorage.setItem('userId', JSON.stringify(userCredential.user.uid));

        checkIfUserLogged();
        router.push('/profile');
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-xl text-black">
        <p className="text-3xl py-4">Войти</p>
        <div className="flex flex-col gap-4">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder="Почта"
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/register">
            <p className="text-sm text-center cursor-pointer">Нет аккаунта? Регистрация!</p>
          </Link>
          <MyButtonDanger
            type="submit"
            className="bg-[#131313] border-white hover:bg-red-500 duration-300 text-white">
            Войти
          </MyButtonDanger>
          <p className="text-sm text-center cursor-pointer text-red-600">{error}</p>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
