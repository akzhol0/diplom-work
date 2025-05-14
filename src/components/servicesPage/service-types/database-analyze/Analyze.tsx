"use client";

import React, { useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyArrowRight from "@/components/UI/icons/my-arrow/MyArrowRight";
import ResultPage from "@/components/servicesPage/service-types/database-analyze/ResultPage";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";

const Analyze = () => {
  const [resultPage, setResultPage] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [userDecision, setUserDecision] = useState<string>("");
  const [error, setError] = useState<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isJson =
      file.name.toLowerCase().endsWith(".json") &&
      (file.type === "application/json" || file.type === "");

    if (!isJson) {
      setError("Пожалуйста, выберите файл с расширением .json");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);
        setUserDecision("own-database");
        setData(json);
        setResultPage(true);
      } catch (err) {
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  return resultPage ? (
    <div>
      <ResultPage
        setResultPage={setResultPage}
        data={data}
        userDecision={userDecision}
      />
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold text-center">
        Выберите базу данных для анализа
      </p>
      <div className="flex flex-col lg:flex-row mt-14 text-lg gap-8">
        <div className="w-[350px] flex flex-col justify-between gap-4">
          <p>Скачать готовую базу данных (в виде .json)</p>
          <a href="/download/users.json" download>
            <MyPrimaryButton className="w-full">Скачать</MyPrimaryButton>
          </a>
        </div>
        <div className="w-[350px] flex flex-col justify-between gap-4 lg:px-8 border-y py-8 lg:py-0 lg:border-x lg:border-y-0">
          <p>Продолжить с готовой базой данных, для примера</p>
          <div className="flex justify-between gap-2">
            <a target="_blank" href="/download/users.json">
              <MyDangerButton className="whitespace-nowrap">
                Пример
              </MyDangerButton>
            </a>
            <div
              onClick={() => {
                setResultPage(true);
                setUserDecision("default");
              }}
              className="flex"
            >
              <MyPrimaryButton className="w-full">Продолжить</MyPrimaryButton>
            </div>
          </div>
        </div>
        <div className="w-[350px] flex flex-col justify-between gap-4">
          <p>Загрузить свою базу данных (только в виде .txt или .json)</p>
          <div className="flex justify-center items-center">
            <label
              htmlFor="file-upload"
              className="w-full flex items-center justify-center px-5 py-3 text-blue-600 whitespace-nowrap hover:bg-blue-600 hover:text-white border-blue-600 border-2 rounded-[8px] cursor-pointer duration-150"
            >
              <span className="mr-2">Выберите файл</span>
              <MyArrowRight />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".json"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 text-red-600">{error}</div>
    </div>
  );
};

export default Analyze;
