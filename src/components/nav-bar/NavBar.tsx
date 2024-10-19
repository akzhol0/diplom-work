import React, { useContext } from 'react';
import MyButtonDanger from '../UI/MyButtonDanger';
import WhatsappLogo from '../UI/icons/medias/WhatsappLogo';
import Link from 'next/link';
import { links } from '../services/links';
import { contextData } from '../context/context';

type NavBarProps = {
  mobileVersion: boolean;
};

function NavBar({ mobileVersion }: NavBarProps) {
  const classesForm = { over: '' };
  if (mobileVersion) classesForm.over = 'flex-col';

  const { auth, setBurgerMenu } = useContext(contextData);

  return (
    <div className={'flex items-center gap-4' + ' ' + classesForm.over}>
      <ul className="flex gap-5">
        {links.map((item: any) => (
          <Link
            key={item.url}
            href={item.url === '/profile' && auth === false ? '/login' : item.url}>
            <li onClick={() => setBurgerMenu(false)} className="cursor-pointer">
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
      <Link href="/request">
        <MyButtonDanger className="hidden lg:flex text-red-500 font-semibold font-sm">
          Оставить заявку
        </MyButtonDanger>
      </Link>
      {mobileVersion && <p>+7 (777) 000 00-00 </p>}
      <p className="hidden xl:block">+7 (777) 000 00-00 </p>
      {mobileVersion && (
        <Link href="/request">
          <MyButtonDanger className="flex text-red-500 font-semibold font-sm">
            Оставить заявку
          </MyButtonDanger>
        </Link>
      )}
      <span className="cursor-pointer">
        <WhatsappLogo />
      </span>
      <select name="" id="">
        <option value="">RU</option>
        <option value="">KZ</option>
        <option value="">ENG</option>
      </select>
    </div>
  );
}

export default NavBar;
