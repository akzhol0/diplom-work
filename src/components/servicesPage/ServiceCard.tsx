"use client";

import React, { useContext } from "react";
import { ServiceCardPropsTypes } from "../types/types";
import Link from "next/link";
import PortItem from "../portfolio/PortItem";
import { contextData } from "../context/context";

type serviceCardsProps = {
  item: ServiceCardPropsTypes;
  from: string;
};

function ServiceCard({ item, from }: serviceCardsProps) {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="flex flex-col gap-2 md:flex-row justify-between">
      <div className="w-full md:w-[50%] flex flex-col">
        <Link href={`/services/${item.card.route}`}>
          <p className="text-[25px] md:text-[30px] font-bold cursor-pointer hover:text-red-600 duration-300">
            {item.title}
          </p>
        </Link>
        <p className="mt-2 xl:mt-2">{item.description}</p>
        <p className="font-semibold mt-2">{item.price} </p>
        {from === "mainPage" && (
          <Link href="/services">
            <p className="cursor-pointer mt-2 text-red-600">
              {mainLanguage.services.small5}
            </p>
          </Link>
        )}
      </div>
      <div className="w-full md:w-[50%] flex justify-center">
        <div className="w-full">
          <PortItem item={item.card} />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
