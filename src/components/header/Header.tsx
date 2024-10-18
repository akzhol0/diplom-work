'use client';

import React, { useState } from 'react';
import Brand from './Brand';
import NavBar from '../nav-bar/NavBar';
import BurgerButton from './header-burger/BurgerButton';

function Header() {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] lg:w-[80%] h-[120px] flex items-center justify-between">
        <Brand />
        <div className="hidden md:block">
          <NavBar mobileVersion={false} />
        </div>
        <div className="block md:hidden">
          <BurgerButton setModal={setModal} modal={modal} />
          {modal && (
            <div className="right-0 top-[120px] absolute w-full flex justify-center items-center min-h-[200px] bg-white">
              <NavBar mobileVersion={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
