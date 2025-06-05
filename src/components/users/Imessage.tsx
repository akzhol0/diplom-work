import React, { memo } from "react";
import Image from "next/image";

type ImessageProps = {
  item: any;
  isSender: boolean;
};

const Imessage = memo(({ item, isSender }: ImessageProps) => {
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleString("ru-RU", options).replace(",", "");
  };

  return (
    <div
      className={`flex items-center gap-2 max-w-[90%] ${
        isSender
          ? "self-end items-end animate-fade-in-message text-right"
          : "self-start items-start animate-fade-in-message text-left"
      }`}
    >
      {isSender && (
        <div className="text-[12px] text-gray-600 whitespace-nowrap">
          {formatTime(item.time)}
        </div>
      )}
      <div
        className={`relative px-4 py-2 rounded-2xl shadow-2xl text-sm ${
          isSender
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="break-words">{item.message}</p>
      </div>
      {!isSender && (
        <div className="text-[12px] text-gray-600 whitespace-nowrap">
          {formatTime(item.time)}
        </div>
      )}
    </div>
  );
});

export default Imessage;
