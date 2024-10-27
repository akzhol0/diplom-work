import React from 'react';
import MyButtonDanger from '../UI/MyButtonDanger';

function RequestComp() {
  return (
    <div className="w-full min-h-[600px] justify-center flex flex-col">
      <div className="w-full flex flex-col md:flex-row justify-between gap-8">
        <span className="w-full flex flex-col">
          <p className="text-xl">Имя</p>
          <input
            className="h-[60px] border-b border-1 focus:outline-[#f1f1f1]"
            placeholder="Введите имя"
            type="text"
            id="name"
          />
        </span>
        <span className="w-full flex flex-col">
          <p className="text-xl">Номер телефона</p>
          <input
            className="h-[60px] border-b border-1 focus:outline-[#f1f1f1]"
            placeholder="+7 (7__) ___-__-__"
            type="number"
            id="tel"
          />
        </span>
        <span className="w-full flex flex-col">
          <p className="text-xl">Email</p>
          <input
            className="h-[60px] border-b border-1 focus:outline-[#f1f1f1]"
            placeholder="Ваша почта"
            type="email"
            id="email"
          />
        </span>
      </div>
      <div className="flex flex-col mt-10">
        <p>Сообщение</p>
        <textarea
          className="h-[150px] border-b focus:outline-[#f1f1f1]"
          placeholder="Сроки запуска, бюджет, требования, ваши пожелания..."
          id="message"></textarea>
      </div>
      <p className="text-[12px] mt-5">
        Заполняя данную форму, вы принимаете условия{' '}
        <label className="text-red-600 cursor-pointer hover:underline">
          Соглашения об использовании сайта
        </label>
        , <br /> и соглашаетесь с{' '}
        <label className="text-red-600 cursor-pointer hover:underline">
          Правилами обработки и использования персональных данных
        </label>
      </p>
      <MyButtonDanger className="w-[200px] text-red-500 mt-5">Начать проект</MyButtonDanger>
    </div>
  );
}

export default RequestComp;
