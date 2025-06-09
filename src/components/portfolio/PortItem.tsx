import React from "react";
import Image from "next/image";
import { PortItemPropsTypes } from "../types/types";

type PortItemProps = {
  item: PortItemPropsTypes;
};

function PortItem({ item }: PortItemProps) {
  return (
    <div
      className={`min-h-[250px] rounded-xl ${item.backgroundColor} overflow-hidden`}
    >
      <div className="flex justify-between">
        <div className="w-[75%] min-h-[250px] py-2 flex flex-col justify-center ps-2 pt-2">
          <p className="text-4xl font-semibold whitespace-nowrap text-gray-800">
            {item.title}
          </p>
          <p className="text-base mt-2">{item.description}</p>
        </div>
        <div className="w-[25%] mt-[100px]">
          <Image
            src="/images/phone.png"
            width={120}
            height={50}
            alt="phone png"
          />
        </div>
      </div>
    </div>
  );
}

export default PortItem;
