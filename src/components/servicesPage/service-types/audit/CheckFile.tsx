"use client";

import React, { useState } from "react";
import axios from "axios";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_VIRUSTOTAL_API;

const CheckFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setScanResult(null);
    setError(null);
    setStatusMessage(null);
  };

  const handleScan = async () => {
    if (!file) {
      setError("Пожалуйста, выберите файл для проверки");
      return;
    }

    setLoading(true);
    setError(null);
    setScanResult(null);
    setStatusMessage("Загружаем файл и запускаем анализ...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/scan-file", {
        method: "POST",
        body: formData,
      });

      const result = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(result.error || "Ошибка при загрузке файла");
      }

      const analysisId = result.data.id;

      setStatusMessage("Файл загружен. Ожидаем завершения анализа...");

      // Polling (тот же, что у тебя)
      let intervalId: NodeJS.Timeout;
      let attempts = 0;
      const maxAttempts = 30;

      const poll = async () => {
        try {
          const res = await fetch(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            {
              headers: {
                "x-apikey": process.env.NEXT_PUBLIC_VIRUSTOTAL_API!,
              },
            },
          );

          const data = await res.json();

          if (data.data.attributes.status === "completed") {
            clearInterval(intervalId);
            setScanResult(data);
            setStatusMessage(null);
            setLoading(false);
          } else {
            setStatusMessage(
              `Ожидаем результат... (${attempts + 1} / ${maxAttempts})`,
            );
          }

          attempts++;
          if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            setError("Анализ не завершился вовремя. Повторите позже.");
            setLoading(false);
          }
        } catch {
          clearInterval(intervalId);
          setError("Ошибка при получении результата анализа.");
          setLoading(false);
        }
      };

      intervalId = setInterval(poll, 4000);
    } catch (err: any) {
      setError(err.message || "Произошла ошибка.");
      setStatusMessage(null);
      setLoading(false);
    }
  };

  const renderDetections = () => {
    const results = scanResult?.data?.attributes?.results;
    if (!results) return null;

    return Object.entries(results).map(([engine, result]: any, index) => (
      <div
        key={engine}
        className={`flex justify-between items-center px-4 py-2 rounded-md shadow-sm transition ${
          result.category === "malicious"
            ? "bg-red-100 text-red-700"
            : "bg-green-50 text-green-700"
        }`}
      >
        <span className="font-semibold">
          {index + 1}. {engine}
        </span>
        <span className="text-sm italic">{result.result || "Чисто"}</span>
        <span className="text-xs text-gray-500">{result.engine_name}</span>
      </div>
    ));
  };

  const renderExtraDetails = () => {
    const attr = scanResult?.data?.attributes;
    if (!attr) return null;

    return (
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <strong>Дата анализа:</strong>{" "}
          {new Date(attr.date * 1000).toLocaleString()}
        </div>
        <div>
          <strong>Статус:</strong> {attr.status}
        </div>
        <div>
          <strong>Статистика:</strong> безопасно: {attr.stats.harmless},
          вредоносно: {attr.stats.malicious}, подозрительно:{" "}
          {attr.stats.suspicious}, таймаут: {attr.stats.timeout}, не обнаружено:{" "}
          {attr.stats.undetected}
        </div>
        <div>
          <strong>ID анализа:</strong> {scanResult?.data?.id}
        </div>
        <div>
          <strong>Тип:</strong> {scanResult?.data?.type}
        </div>
        <div>
          <strong>Длина ID:</strong> {scanResult?.data?.id.length} символов
        </div>
        <div>
          <strong>Количество движков:</strong>{" "}
          {Object.keys(attr.results || {}).length}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full from-gray-50 to-blue-100 p-0 sm:px-6 sm:py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-2 px-6">
          Проверка файла на вирусы
        </h1>
        <p className="text-sm text-gray-600 mb-2 px-6">
          Выберите файл для загрузки и проверки через VirusTotal. Результаты
          анализа появятся ниже.
        </p>
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <label
            htmlFor="file-upload"
            className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 text-blue-600 transition
              ${file ? "border-blue-600 bg-blue-50" : "border-blue-400 bg-white"}
              hover:border-blue-700 hover:bg-blue-50`}
          >
            {file ? (
              <span className="text-lg font-semibold">{file.name}</span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4v-3a4 4 0 00-4-4H7a4 4 0 00-4 4v3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h8M12 6v8"
                  />
                </svg>
                <span>Нажмите или перетащите файл сюда</span>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="*/*"
              disabled={loading}
            />
          </label>
          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p>Максимальный размер файла: 32 МБ</p>
            <p>Поддерживаются все типы файлов</p>
            <p>Файл будет загружен и проверен на вирусы с помощью VirusTotal</p>
            <p>Пожалуйста, не загружайте конфиденциальные или личные данные</p>
          </div>
          <MyPrimaryButton
            onClick={handleScan}
            disabled={loading || !file}
            className="mt-6 rounded-lg shadow-md transition disabled:opacity-50 w-full"
          >
            {loading ? "Сканируем..." : "Проверить файл"}
          </MyPrimaryButton>
          {statusMessage && (
            <div className="mt-4 text-blue-700 font-medium">
              {statusMessage}
            </div>
          )}
          {error && <div className="text-red-600 mt-4">{error}</div>}
        </div>
        {scanResult && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Детали анализа
              </h2>
              {renderExtraDetails()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Отчёт от антивирусных систем
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {renderDetections()}
              </div>
            </div>
          </div>
        )}
        <Link href="/services/audit">
          <MyDangerButton>Назад</MyDangerButton>
        </Link>
      </div>
    </div>
  );
};

export default CheckFile;
