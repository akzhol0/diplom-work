import React from 'react';
import WhatsappLogo from '../UI/icons/medias/WhatsappLogo';
import MyButtonDanger from '../UI/MyButtonDanger';
import MyArrow from '../UI/icons/my-arrow/MyArrow';
import Link from 'next/link';

function Footer() {
  return (
    <div className="w-full h-[600px] flex justify-center mt-10 bg-[#1b1b1b]">
      <div className="w-[1000px] px-4 h-full flex flex-col justify-center items-center lg:items-start text-white">
        <p className="w-full flex text-[30px]">Свяжитесь с нами</p>
        <div className="w-full flex flex-col md:flex-row lg:items-center gap-4 justify-between lg:border-b">
          <div className="min-h-[200px] lg:items-center flex flex-col lg:flex-row gap-[40px]">
            <span className="flex flex-col">
              <p className="text-lg">Email:</p>
              <p className="text-xl">sales@brooklyn.kz</p>
            </span>
            <span className="flex flex-col">
              <p className="text-lg">Телефон:</p>
              <p className="text-xl">+7 (777) 000 00-00</p>
            </span>
            <span className="flex flex-col">
              <p className="text-lg">Мессенджеры:</p>
              <div className="pt-2 cursor-pointer">
                <WhatsappLogo background="white" />
              </div>
            </span>
          </div>
          <Link href="/request">
            <MyButtonDanger className="w-[220px] h-[60px] gap-2">
              Оставить заявку
              <MyArrow />
            </MyButtonDanger>
          </Link>
        </div>
        <div className="flex mt-10">
          <small>© 2024 Brooklyn</small>
        </div>
      </div>
    </div>
  );
}

export default Footer;
