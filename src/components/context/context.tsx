'use client';

import React, { createContext, useState } from 'react';

type ContextProps = {
  auth: boolean;
  burgerMenu: boolean;
  setBurgerMenu: (arg0: boolean) => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [auth, setAuth] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);

  return (
    <contextData.Provider
      value={{
        auth,
        burgerMenu,
        setBurgerMenu,
      }}>
      {children}
    </contextData.Provider>
  );
}
