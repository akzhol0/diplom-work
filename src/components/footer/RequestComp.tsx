"use client";

import React, { useContext } from "react";
import MyButtonDanger from "../UI/MyButtonDanger";
import { contextData } from "../context/context";

function RequestComp() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-full min-h-[600px] justify-center flex flex-col">
      <div className="w-full flex flex-col md:flex-row justify-between gap-8">
        <span className="w-full flex flex-col">
          <p className="text-xl">{mainLanguage.request.name}</p>
          <input
            className="h-[60px] border-b border-1 focus:outline-0"
            placeholder={mainLanguage.request.namePlaceholder}
            type="text"
            id="name"
          />
        </span>
        <span className="w-full flex flex-col">
          <p className="text-xl">{mainLanguage.request.phone}</p>
          <input
            className="h-[60px] border-b border-1 focus:outline-0"
            placeholder="+7 (7__) ___-__-__"
            type="number"
            id="phone"
          />
        </span>
        <span className="w-full flex flex-col">
          <p className="text-xl">{mainLanguage.request.email}</p>
          <input
            className="h-[60px] border-b border-1 focus:outline-0"
            placeholder={mainLanguage.request.emailPlaceholder}
            type="email"
            id="email"
          />
        </span>
      </div>
      <div className="flex flex-col mt-10">
        <p>{mainLanguage.request.message}</p>
        <textarea
          className="w-full h-[150px] border-b focus:outline-0"
          placeholder={mainLanguage.request.messagePlaceholder}
          id="message"
        ></textarea>
      </div>
      <p className="text-[12px] mt-5">
        {mainLanguage.request.userAgreementGray1}{" "}
        <label className="text-red-600 cursor-pointer hover:underline">
          {mainLanguage.request.userAgreementRed1}
        </label>
        , <br /> {mainLanguage.request.userAgreementGray2}{" "}
        <label className="text-red-600 cursor-pointer hover:underline">
          {mainLanguage.request.userAgreementRed2}
        </label>
      </p>
      <MyButtonDanger className="w-[200px] text-red-500 mt-5">
        {mainLanguage.request.btn}
      </MyButtonDanger>
    </div>
  );
}

export default RequestComp;
