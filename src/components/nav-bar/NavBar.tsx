"use client";

import React, { useContext } from "react";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import WhatsappLogo from "../UI/icons/medias/WhatsappLogo";
import Link from "next/link";
import { contextData } from "../context/context";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

function NavBar() {
  const pathname = usePathname();

  const {
    isAuth,
    setBurgerMenu,
    setLanguageChanger,
    mainLanguage,
    languageChanger,
  } = useContext(contextData);

  return (
    <div
      className={`flex-col md:flex-row flex items-center justify-center gap-4`}
    >
      <ul className="flex flex-col md:flex-row text-center gap-4 sm:gap-5 text-lg">
        {mainLanguage.header.links.map((item: any) => (
          <Link
            key={item.url}
            href={item.url === "/profile" && !isAuth ? "/login" : item.url}
          >
            <li
              onClick={() => setBurgerMenu(false)}
              className={`${pathname === item.url ? "text-gray-500 hover:text-gray-500 cursor-pointer whitespace-nowrap" : "cursor-pointer whitespace-nowrap hover:text-red-600"}`}
            >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
      <Link href="/request">
        <MyButtonDanger className="flex md:hidden lg:flex text-red-500 font-semibold font-sm whitespace-nowrap">
          {mainLanguage.header.btn}
        </MyButtonDanger>
      </Link>
      <p className="flex sm:hidden xl:block whitespace-nowrap">
        +7 (777) 000 00-00
      </p>
      <span className="cursor-pointer">
        <WhatsappLogo background="black" />
      </span>
      <select
        onChange={(e) => {
          setLanguageChanger(e.target.value);
          Cookies.set("lang", e.target.value);
        }}
        value={languageChanger}
        className="text-lg mb-2 md:mb-0"
        name="language-option"
        id="language-option"
      >
        <option value="ru">RUS</option>
        <option value="kz">KAZ</option>
        <option value="en">ENG</option>
      </select>
    </div>
  );
}

export default NavBar;
