import React from 'react';

type BurgerButtonProps = {
  modal: boolean;
  setModal: (arg0: boolean) => void;
};

function BurgerButton({ modal, setModal }: BurgerButtonProps) {
  // dont mind stupid code, ill change it later :))))

  return (
    <div
      onClick={() => setModal(!modal)}
      className="w-[40px] h-[30px] flex flex-col justify-between cursor-pointer">
      <span className="w-full h-[3px] bg-black"></span>
      <span className="w-full h-[3px] bg-black"></span>
      <span className="w-full h-[3px] bg-black"></span>
    </div>
  );
}

export default BurgerButton;
