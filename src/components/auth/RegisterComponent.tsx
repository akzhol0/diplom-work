'use client';

import Link from 'next/link';
import React, { useContext, useState } from 'react';
import MyButtonDanger from '../UI/MyButtonDanger';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { contextData } from '../context/context';
import Eye from '../UI/icons/eye/eye';

function RegisterComponent() {
  const [userName, setUserName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordEye, setPasswordEye] = useState(false);
  const [gender, setGender] = useState('Неизвестно');
  const [error, setError] = useState('');

  const { mainLanguage } = useContext(contextData);

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
        addUserFirebase(userCredentials);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const addUserFirebase = async (userInfo: any) => {
    await setDoc(doc(db, 'users', userInfo.user.uid), {
      userName: userName,
      userId: userInfo.user.uid,
      userLogin: login,
      userPassword: password,
      role: 'user',
      gender: gender,
    });
  };

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-xl text-black">
        <p className="text-3xl py-4">{mainLanguage.loginAndRegsitration.titleRegister}</p>
        <div className="flex flex-col gap-4">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder={mainLanguage.loginAndRegsitration.nameLastName}
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <p className="ps-2">{mainLanguage.loginAndRegsitration.gender}:</p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="focus:outline-0"
              name="gender"
              id="gender-select">
              {mainLanguage.loginAndRegsitration.genders.map((item: string) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder={mainLanguage.loginAndRegsitration.email}
            type="text"
            id="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <div className="relative">
            <input
              className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
              placeholder={mainLanguage.loginAndRegsitration.password}
              type={passwordEye ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setPasswordEye(!passwordEye)}
              className="absolute right-4 bottom-4 cursor-pointer">
              <Eye />
            </div>
          </div>
          <div className="relative">
            <input
              className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
              placeholder={mainLanguage.loginAndRegsitration.repeatPassword}
              type={passwordEye ? 'text' : 'password'}
              id="password-repeat"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <div
              onClick={() => setPasswordEye(!passwordEye)}
              className="absolute right-4 bottom-4 cursor-pointer">
              <Eye />
            </div>
          </div>
          <Link href="/login">
            <p className="text-sm text-center cursor-pointer">
              {mainLanguage.loginAndRegsitration.labelRegister}
            </p>
          </Link>
          <MyButtonDanger
            type="submit"
            className="bg-[#131313] border-white hover:bg-red-500 duration-300 text-white">
            {mainLanguage.loginAndRegsitration.btnRegister}
          </MyButtonDanger>
          <p className="text-sm text-center cursor-pointer text-red-600">{error}</p>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;
