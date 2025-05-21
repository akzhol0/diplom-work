"use client";

import { useState } from "react";
import axios from "axios";

const CheckWebsite = () => {
  const API_KEY = process.env.NEXT_PUBLIC_VIRUSTOTAL_API;

  const [url, setUrl] = useState("https://sm.kz");
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setScanResult(null);

    try {
      const postResponse = await axios.post(
        "https://www.virustotal.com/api/v3/urls",
        new URLSearchParams({ url }),
        {
          headers: {
            "x-apikey": API_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      const analysisId = postResponse.data.data.id;

      // Ждём завершения анализа
      let analysisData = null;
      let attempts = 0;

      while (attempts < 10) {
        const response = await axios.get(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          {
            headers: {
              "x-apikey": API_KEY,
            },
          },
        );

        if (response.data.data.attributes.status === "completed") {
          analysisData = response.data;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempts++;
      }

      if (!analysisData) {
        setError("Анализ не завершился вовремя. Повторите попытку позже.");
      } else {
        setScanResult(analysisData);
      }
    } catch (err: any) {
      setError(err?.message || "Произошла ошибка при проверке.");
    } finally {
      setLoading(false);
    }
  };

  const getDetections = () => {
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

  const getExtraDetails = () => {
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
          <strong className="max-w-[200px] overflow-hidden">ID анализа:</strong>{" "}
          {scanResult?.data?.id}
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
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black mb-4 px-6">
          Онлайн проверка веб-сайта
        </h1>
        <p className="text-gray-600 mb-8 px-6">
          Введите адрес сайта — и мы отправим его в VirusTotal для анализа.
          Результаты будут получены от реальных антивирусных движков.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Например: https://example.com"
              className="flex-grow border border-gray-300 rounded-md px-4 py-3 text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition w-full sm:w-auto"
            />
            <button
              onClick={handleScan}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? "Сканируем..." : "Проверить"}
            </button>
          </div>
          {error && <div className="text-red-600 mt-4">{error}</div>}
        </div>

        {scanResult && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                Детали анализа
              </h2>
              {getExtraDetails()}
            </div>

            <div className="overflow-hidden">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Отчёт от антивирусных систем
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {getDetections()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckWebsite;
