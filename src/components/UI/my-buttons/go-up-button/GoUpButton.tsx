import React from "react";
import MyArrowUp from "@/components/UI/icons/my-arrow/MyArrowUp";

const GoUpButton = () => {
  return (
    <div className="z-50 fixed right-5 bottom-5">
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-[60px] h-[60px] cursor-pointer"
      >
        <MyArrowUp />
      </div>
    </div>
  );
};

export default GoUpButton;
