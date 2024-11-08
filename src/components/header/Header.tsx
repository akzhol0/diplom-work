"use client";

import React, { useContext, useState } from "react";
import Brand from "./Brand";
import NavBar from "../nav-bar/NavBar";
import BurgerButton from "./header-burger/BurgerButton";
import { contextData } from "../context/context";

function Header() {
  const { burgerMenu, setBurgerMenu } = useContext(contextData);

  return (
    <div className="sticky top-0 w-full flex justify-center bg-[#ffffff]">
      <div className="w-[95%] lg:w-[80%] h-[80px] flex items-center justify-center md:justify-between gap-4">
        <Brand />
        <div className="hidden md:block">
          <NavBar mobileVersion={false} />
        </div>
      </div>
      <div className="flex pt-6 pe-6 md:hidden">
        <BurgerButton setBurgerMenu={setBurgerMenu} burgerMenu={burgerMenu} />
        {burgerMenu && (
          <div
            className="absolute left-0 top-[80px] w-full flex justify-center items-center min-h-[200px]
                          bg-white border-b border-black"
          >
            <NavBar mobileVersion={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
