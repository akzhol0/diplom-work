import React from "react";

const GoUpButton = () => {
  return (
    <div className="fixed right-5 bottom-5">
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-[60px] h-[60px] cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default GoUpButton;
