import React from "react";

type BurgerButtonProps = {
  burgerMenu: boolean;
  setBurgerMenu: (arg0: boolean) => void;
};

function BurgerButton({ burgerMenu, setBurgerMenu }: BurgerButtonProps) {
  return burgerMenu ? (
    <div
      onClick={() => setBurgerMenu(!burgerMenu)}
      className="w-[40px] h-[40px] flex flex-col justify-center cursor-pointer"
    >
      <span className="absolute w-[40px] h-[3px] bg-black rotate-45 origin-center"></span>
      <span className="absolute w-[40px] h-[3px] bg-black -rotate-45 origin-center"></span>
    </div>
  ) : (
    <div
      onClick={() => setBurgerMenu(!burgerMenu)}
      className="w-[40px] h-[30px] flex flex-col justify-between cursor-pointer"
    >
      <span className="w-full h-[3px] bg-black"></span>
      <span className="w-full h-[3px] bg-black"></span>
      <span className="w-full h-[3px] bg-black"></span>
    </div>
  );
}

export default BurgerButton;
