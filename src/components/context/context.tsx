'use client';

import React, { createContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import { en } from '../language/en';
import { ru } from '../language/ru';
import { kz } from '../language/kz';

type ContextProps = {
  auth: boolean;
  setAuth: (arg0: boolean) => void;
  burgerMenu: boolean;
  setBurgerMenu: (arg0: boolean) => void;
  checkIfUserLogged: () => void;
  userInfo: any;
  setLanguageChanger: (arg0: string) => void;
  mainLanguage: any;
  languageChanger: string;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [burgerMenu, setBurgerMenu] = useState(false);

  const [languageChanger, setLanguageChanger] = useState('ru');
  const [mainLanguage, setMainLanguage] = useState<any>(ru);

  useEffect(() => {
    !auth && checkIfUserLogged();

    const localstorageMainLanguage = localStorage.getItem('lang');
    setLanguageChanger(localstorageMainLanguage || 'ru');
  }, []);

  useEffect(() => {
    // change it asap
    if (languageChanger === 'en') {
      setMainLanguage(en);
    } else if (languageChanger === 'kz') {
      setMainLanguage(kz);
    } else if (languageChanger === 'ru') {
      setMainLanguage(ru);
    }
  }, [languageChanger]);

  // check if user logged (that's what function name literally says :| )
  const checkIfUserLogged = async () => {
    const result = localStorage.getItem('userId');
    const userId = result ? JSON.parse(result) : null;

    if (userId !== null) {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAuth(true);
        setUserInfo(docSnap.data());
      }
    }
  };

  return (
    <contextData.Provider
      value={{
        auth,
        setAuth,
        burgerMenu,
        setBurgerMenu,
        checkIfUserLogged,
        userInfo,
        setLanguageChanger,
        mainLanguage,
        languageChanger,
      }}>
      {children}
    </contextData.Provider>
  );
}
