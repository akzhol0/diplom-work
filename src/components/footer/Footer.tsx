"use client";

import React, { useContext } from "react";
import WhatsappLogo from "../UI/icons/medias/WhatsappLogo";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import MyArrow from "../UI/icons/my-arrow/MyArrow";
import Link from "next/link";
import { contextData } from "../context/context";

function Footer() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-full h-[600px] flex justify-center mt-10 bg-[#131313]">
      <div className="w-[1000px] px-4 h-full relative flex flex-col justify-center items-center lg:items-start text-white">
        <p className="w-full flex text-[30px]">{mainLanguage.footer.title}</p>
        <div className="w-full flex flex-col md:flex-row lg:items-center gap-4 justify-between lg:border-b">
          <div className="min-h-[200px] lg:items-center flex flex-col lg:flex-row gap-[40px]">
            <span className="flex flex-col">
              <p className="text-lg">{mainLanguage.footer.email}:</p>
              <p className="text-xl">ak.akzhol1603@gmail.com</p>
            </span>
            <span className="flex flex-col">
              <p className="text-lg">{mainLanguage.footer.phone}:</p>
              <p className="text-xl">+7 (707) 111 78-04</p>
            </span>
            <span className="flex flex-col">
              <p className="text-lg">{mainLanguage.footer.messengers}:</p>
              <div className="pt-2 cursor-pointer">
                <WhatsappLogo background="white" />
              </div>
            </span>
          </div>
          <Link href="/request">
            <MyButtonDanger className="w-[220px] h-[60px] gap-2 text-white">
              {mainLanguage.footer.btn}
              <MyArrow />
            </MyButtonDanger>
          </Link>
        </div>
        <div className="flex mt-10">
          <small>© 2025 Mercury</small>
        </div>
        <p className="absolute bottom-0 w-full text-center text-[10px] text-gray-300">
          Made by Akzhol Tursynkhan
        </p>
      </div>
    </div>
  );
}

export default Footer;
