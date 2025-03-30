"use client";

import React, { useContext } from "react";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import WhatsappLogo from "../UI/icons/medias/WhatsappLogo";
import Link from "next/link";
import { contextData } from "../context/context";
import { usePathname } from "next/navigation";

type NavBarProps = {
  mobileVersion: boolean;
};

function NavBar({ mobileVersion }: NavBarProps) {
  const classesForm = { over: "" };
  if (mobileVersion) classesForm.over = "flex-col";
  const pathname = usePathname();

  const {
    auth,
    setBurgerMenu,
    setLanguageChanger,
    mainLanguage,
    languageChanger,
  } = useContext(contextData);

  return (
    <div className={"flex items-center gap-4" + " " + classesForm.over}>
      <ul className="flex gap-2 sm:gap-5 text-lg">
        {mainLanguage.header.links.map((item: any) => (
          <Link
            key={item.url}
            href={item.url === "/profile" && !auth ? "/login" : item.url}
          >
            <li
              onClick={() => setBurgerMenu(false)}
              className={
                "" + pathname === item.url
                  ? "cursor-pointer text-gray-500 whitespace-nowrap hover:text-red-600"
                  : "cursor-pointer whitespace-nowrap hover:text-red-600"
              }
            >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
      <Link href="/request">
        <MyButtonDanger className="hidden lg:flex text-red-500 font-semibold font-sm whitespace-nowrap">
          {mainLanguage.header.btn}
        </MyButtonDanger>
      </Link>
      {mobileVersion && <p className="whitespace-nowrap">+7 (777) 000 00-00</p>}
      <p className="hidden xl:block whitespace-nowrap">+7 (777) 000 00-00</p>
      {mobileVersion && (
        <Link onClick={() => setBurgerMenu(false)} href="/request">
          <MyButtonDanger className="flex text-red-500 font-semibold font-sm">
            {mainLanguage.header.btn}
          </MyButtonDanger>
        </Link>
      )}
      <span className="cursor-pointer">
        <WhatsappLogo background="black" />
      </span>
      <select
        onChange={(e) => {
          setLanguageChanger(e.target.value);
          localStorage.setItem("lang", e.target.value);
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
