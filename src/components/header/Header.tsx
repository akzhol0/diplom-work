"use client";

import React, { useContext } from "react";
import Brand from "./Brand";
import NavBar from "../nav-bar/NavBar";
import BurgerButton from "./header-burger/BurgerButton";
import { contextData } from "../context/context";

function Header() {
  const { burgerMenu, setBurgerMenu } = useContext(contextData);

  return (
    <div className="sticky top-0 w-full flex justify-center bg-[#ffffff] z-50">
      <div className="w-[95%] lg:w-[90%] xl:w-[80%] h-[80px] flex items-center justify-center md:justify-between gap-4">
        <div className="">
          <Brand />
        </div>
        <div className="hidden md:block">
          <NavBar />
        </div>
      </div>
      <div className="flex pt-6 pe-6 md:hidden overflow-hidden">
        <BurgerButton setBurgerMenu={setBurgerMenu} burgerMenu={burgerMenu} />
        <div
          className={`absolute right-0 transform translate-x-[-800px] flex top-[80px] w-full justify-center 
          items-start h-screen bg-white border-b transition-all duration-300 border-black 
          ${burgerMenu && "translate-x-[0px]"}`}
        >
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default Header;
