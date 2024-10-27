'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import MyButtonDanger from '../UI/MyButtonDanger';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';

function RegisterComponent() {
  const [userName, setUserName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    createUserWithEmailAndPassword(auth, login, password)
      .then((userCredentials) => {
        router.push('/login');
        adddbDocc(userCredentials);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const adddbDocc = async (userInfo: any) => {
    await setDoc(doc(db, 'users', userInfo.user.uid), {
      userName: userName,
      userId: userInfo.user.uid,
      userLogin: login,
      userPassword: password,
      role: 'user',
    });
  };

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-xl text-black">
        <p className="text-3xl py-4">Регистрация</p>
        <div className="flex flex-col gap-4">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder="Имя и фамилия"
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder="Логин"
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
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder="Повторить пароль"
            type="password"
            id="password-repeat"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Link href="/login">
            <p className="text-sm text-center cursor-pointer">Есть аккаунт? Войти!</p>
          </Link>
          <MyButtonDanger
            type="submit"
            className="bg-[#131313] border-white hover:bg-red-500 duration-300 text-white">
            Регистрация
          </MyButtonDanger>
          <p className="text-sm text-center cursor-pointer text-red-600">{error}</p>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;
