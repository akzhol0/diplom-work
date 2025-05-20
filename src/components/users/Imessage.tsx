import React, { memo } from "react";

type ImessageProps = {
  item: any;
  isSender: boolean;
};

const Imessage = memo(({ item, isSender }: ImessageProps) => {
  return (
    <div
      className={`flex flex-col max-w-[75%] ${
        isSender
          ? "self-end items-end animate-fade-in-message text-right"
          : "self-start items-start animate-fade-in-message text-right"
      }`}
    >
      <div
        className={`relative px-4 py-2 rounded-2xl shadow-md text-sm ${
          isSender
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="break-words">{item.message}</p>
      </div>
    </div>
  );
});

export default Imessage;
