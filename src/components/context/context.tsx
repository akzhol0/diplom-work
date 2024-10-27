'use client';

import React, { createContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

type ContextProps = {
  auth: boolean;
  setAuth: (arg0: boolean) => void;
  burgerMenu: boolean;
  setBurgerMenu: (arg0: boolean) => void;
  checkIfUserLogged: () => void;
  userInfo: any;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [burgerMenu, setBurgerMenu] = useState(false);

  useEffect(() => {
    !auth && checkIfUserLogged();
  }, []);

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
      }}>
      {children}
    </contextData.Provider>
  );
}
