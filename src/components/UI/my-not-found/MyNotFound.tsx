"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { contextData } from "@/components/context/context";

const MyNotFound = () => {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="mx-auto max-w-screen-sm text-center">
      <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
        404
      </h1>
      <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-black">
        {mainLanguage.rest.pageErrorMessage}
      </p>
      <p className="mb-4 text-lg font-light text-gray-900">
        {mainLanguage.rest.pageErrorApology}
      </p>
      <Link
        href="/"
        className="inline-flex text-white bg-gray-900 hover:bg-primary-800 focus:ring-4
            focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5
            text-center my-4"
      >
        {mainLanguage.rest.pageErrorMainPage}
      </Link>
    </div>
  );
};

export default MyNotFound;
