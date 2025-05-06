import React from "react";
import { SiSimpleicons } from "react-icons/si";

type OpenModalProps = {
  setIsUserListModal: (arg: boolean) => void;
};

const OpenModal = ({ setIsUserListModal }: OpenModalProps) => {
  return (
    <div className="z-20 fixed bottom-5 right-5">
      <button
        className="flex items-center gap-2 p-2 bg-neutral-900 text-white rounded-2xl shadow-sm hover:bg-neutral-800 transition-all duration-200"
        onClick={() => {
          setIsUserListModal(true);
        }}
      >
        <div className="flex items-center justify-center bg-neutral-800 p-1.5 rounded-full">
          <SiSimpleicons className="text-white w-5 h-5" />
        </div>
        <span className="hidden sm:block text-sm font-medium">
          Все пользователи
        </span>
      </button>
    </div>
  );
};

export default OpenModal;
