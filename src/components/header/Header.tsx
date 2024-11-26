"use client";

import React, { useContext, useState } from "react";
import Brand from "./Brand";
import NavBar from "../nav-bar/NavBar";
import BurgerButton from "./header-burger/BurgerButton";
import { contextData } from "../context/context";

function Header() {
  const { burgerMenu, setBurgerMenu } = useContext(contextData);

  return (
    <div className="sticky top-0 w-full flex justify-center bg-[#ffffff] z-50">
      <div className="flex pt-6 ps-6 md:hidden">
        <BurgerButton setBurgerMenu={setBurgerMenu} burgerMenu={burgerMenu} />
        <div
          className={`absolute right-0 bit1 flex top-[80px] w-full justify-center 
          items-start h-screen bg-white border-b duration-[0.4s] border-black 
          ${burgerMenu ? "bit2 duration-[0.4s]" : ""}`}
        >
          <NavBar mobileVersion={true} />
        </div>
      </div>
      <div className="w-[95%] lg:w-[80%] h-[80px] flex items-center justify-center md:justify-between gap-4">
        <div className="ms-[-60px] md:ms-[0]">
          <Brand />
        </div>
        <div className="hidden md:block">
          <NavBar mobileVersion={false} />
        </div>
      </div>
    </div>
  );
}

export default Header;
