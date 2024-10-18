'use client';

import React, { createContext, useState } from 'react';

type ContextProps = {
  auth: boolean;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [auth, setAuth] = useState(false);

  return (
    <contextData.Provider
      value={{
        auth,
      }}>
      {children}
    </contextData.Provider>
  );
}
