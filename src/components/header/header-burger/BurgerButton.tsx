import React from "react";

type BurgerButtonProps = {
  burgerMenu: boolean;
  setBurgerMenu: (arg0: boolean) => void;
};

function BurgerButton({ burgerMenu, setBurgerMenu }: BurgerButtonProps) {
  return (
    <div
      onClick={() => setBurgerMenu(!burgerMenu)}
      className={`w-[40px] h-[30px] flex flex-col justify-between cursor-pointer duration-300`}
    >
      <span
        className={`w-full h-[3px] bg-black origin-center duration-300 ${burgerMenu && "rotate-45 translate-y-[13px]"}`}
      ></span>
      <span
        className={`w-full h-[3px] bg-black duration-300 ${burgerMenu && "hidden"}`}
      ></span>
      <span
        className={`w-full h-[3px] bg-black origin-center duration-300 ${burgerMenu && "-rotate-45 translate-y-[-13px]"}`}
      ></span>
    </div>
  );
}

export default BurgerButton;
