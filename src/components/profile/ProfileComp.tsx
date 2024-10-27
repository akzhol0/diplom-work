'use client';

import React, { useContext } from 'react';
import { contextData } from '@/components/context/context';
import MyButtonDanger from '../UI/MyButtonDanger';
import { useRouter } from 'next/navigation';

function ProfileComp() {
  const { userInfo, setAuth } = useContext(contextData);
  const router = useRouter();

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        {userInfo.length !== 0 ? (
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <span className="w-[200px] h-[200px] rounded-[50%] bg-black"></span>
            <div className="flex flex-col text-lg">
              <p>Имя: {userInfo.userName}</p>
              <p>Почта: {userInfo.userLogin}</p>
              <p>Роль: {userInfo.role === 'user' ? 'Обычный пользователь' : 'Администратор'}</p>
              <span
                onClick={() => {
                  setAuth(false);
                  localStorage.removeItem('userId');
                  router.push('/login');
                }}>
                <MyButtonDanger className="font-semibold h-[40px] mt-4 text-red-600">
                  Выйти из аккаунта
                </MyButtonDanger>
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center">Загрузка...</p>
        )}
      </div>
    </div>
  );
}

export default ProfileComp;
