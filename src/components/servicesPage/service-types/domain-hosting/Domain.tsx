"use client";

import React, { useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import Hosting from "@/components/servicesPage/service-types/domain-hosting/Hosting";

const Domain = () => {
  const [domainName, setDomainName] = useState("");
  const [nextStage, setNextStage] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (domainName === "" || domainName.length < 3) {
      setErrorMessage("Доменное имя слишком короткое!");
      return;
    }

    const apiKey = "at_4PwIoJsjr31Zev3lXo9D1dbJEIanI";
    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domainName}&outputFormat=JSON`;

    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (data.WhoisRecord?.dataError === "MISSING_WHOIS_DATA") {
        setSuccessMessage("Домен доступен");
      } else {
        setErrorMessage(
          "Домен уже занят или надо использовать домены верхнего уровня (.com .org .net и т.д)",
        );
      }
    } catch (err: any) {
      setErrorMessage("Ошибка");
      console.error(err);
    }
  };

  return nextStage ? (
    <div className="flex flex-col justify-center items-center">
      <Hosting domainName={domainName} />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <p className="text-lg md:text-3xl font-semibold mt-2">
        Проверить регистрацию домена:
      </p>
      <form onSubmit={handleSubmit} className="w-full flex justify-center mt-6">
        <input
          className="w-full md:w-[50%] h-[60px] ps-4 md:text-2xl rounded-2xl border-b-2 focus:outline-0"
          type="text"
          value={domainName}
          onChange={(e) => {
            if (successMessage === "") {
              setDomainName(e.target.value);
            }
          }}
          placeholder="example-domain.com"
        />
        <MyDangerButton type="submit" className="px-1 md:px-4 rounded-xl">
          Проверить
        </MyDangerButton>
      </form>
      <div className="py-2">
        <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        <p className="text-green-600 text-sm text-center">{successMessage}</p>
      </div>
      <div
        onClick={() => {
          if (successMessage.length > 0) {
            setNextStage(true);
          } else {
            setErrorMessage("Проверьте домен!");
          }
        }}
      >
        <MyPrimaryButton>Продолжить</MyPrimaryButton>
      </div>
    </div>
  );
};

export default Domain;
