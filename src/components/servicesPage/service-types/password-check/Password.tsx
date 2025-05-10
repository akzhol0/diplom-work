"use client";

import React, { useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import Link from "next/link";
import PasswordResult from "@/components/servicesPage/service-types/password-check/PasswordResult";

const Password = () => {
  const [results, setResults] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  return !results ? (
    <div>
      <h1 className="text-start text-3xl font-semibold my-4">
        Надежность пароля
      </h1>
      <p className="text-md">
        Напишите свой пароль который вы используете и система анализирует и даст
        оценку и рекомендаций на надежность и безопасность
      </p>
      <div className="flex gap-2 my-6">
        <input
          type="text"
          placeholder="Введите пароль..."
          className="w-full max-w-xl px-4 py-3 text-base text-gray-800 placeholder-gray-400 bg-white border
          border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          focus:border-transparent transition"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          name={"passwordInput"}
          id="passwordInput"
        />
        <MyPrimaryButton onClick={() => setResults(true)}>
          Продолжить
        </MyPrimaryButton>
      </div>
      <p className="text-gray-500 text-xs">
        Введённый пароль не сохраняется и не отправляется на сервер. Мы не
        используем ваши данные ни для каких целей. Всё происходит безопасно и
        анонимно.
      </p>
      <div className="flex">
        <Link href="/services">
          <MyDangerButton className="my-4 px-8">Назад</MyDangerButton>
        </Link>
      </div>
    </div>
  ) : (
    <div>
      <h1 className="text-center text-3xl font-semibold my-4">Результаты</h1>
      <PasswordResult setResults={setResults} password={passwordInput} />
    </div>
  );
};

export default Password;
