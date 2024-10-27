import React, { useContext } from 'react';
import MyButtonDanger from '../UI/MyButtonDanger';
import WhatsappLogo from '../UI/icons/medias/WhatsappLogo';
import Link from 'next/link';
import { links } from '../services/links';
import { contextData } from '../context/context';
import { usePathname } from 'next/navigation';

type NavBarProps = {
  mobileVersion: boolean;
};

function NavBar({ mobileVersion }: NavBarProps) {
  const classesForm = { over: '' };
  if (mobileVersion) classesForm.over = 'flex-col';
  const pathname = usePathname();

  const { auth, setBurgerMenu } = useContext(contextData);
  return (
    <div className={'flex items-center gap-4' + ' ' + classesForm.over}>
      <ul className="flex gap-5">
        {links.map((item: any) => (
          <Link
            key={item.url}
            href={item.url === '/profile' && auth === false ? '/login' : item.url}>
            <li
              onClick={() => setBurgerMenu(false)}
              className={
                '' + pathname === item.url
                  ? 'cursor-pointer text-gray-500 whitespace-nowrap'
                  : 'cursor-pointer whitespace-nowrap'
              }>
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
      <Link href="/request">
        <MyButtonDanger className="hidden lg:flex text-red-500 font-semibold font-sm whitespace-nowrap">
          Оставить заявку
        </MyButtonDanger>
      </Link>
      {mobileVersion && <p>+7 (777) 000 00-00 </p>}
      <p className="hidden xl:block whitespace-nowrap">+7 (777) 000 00-00 </p>
      {mobileVersion && (
        <Link onClick={() => setBurgerMenu(false)} href="/request">
          <MyButtonDanger className="flex text-red-500 font-semibold font-sm">
            Оставить заявку
          </MyButtonDanger>
        </Link>
      )}
      <span className="cursor-pointer">
        <WhatsappLogo background="black" />
      </span>
      {/* <select name="" id="">
        <option value="">RU</option>
        <option value="">KZ</option>
        <option value="">ENG</option>
      </select> */}
    </div>
  );
}

export default NavBar;
