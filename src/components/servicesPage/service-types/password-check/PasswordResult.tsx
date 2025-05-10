"use client";

import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";
import { useEffect, useState } from "react";

type PasswordResultProps = {
  password: string;
  setResults: (arg0: boolean) => void;
};

type Strength = "weak" | "medium" | "strong";

const getStrength = (password: string): Strength => {
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);

  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;

  if (length >= 12 && score === 4) return "strong";
  if (length >= 8 && score >= 2) return "medium";
  return "weak";
};

const getRecommendations = (password: string): string[] => {
  const tips = [];
  if (password.length < 12)
    tips.push("Попробуйте сделать пароль длиннее — минимум 12 символов.");
  if (!/[A-Z]/.test(password))
    tips.push("Добавьте хотя бы одну заглавную букву для усиления.");
  if (!/[a-z]/.test(password))
    tips.push("Добавьте строчные буквы — они обязательны.");
  if (!/\d/.test(password))
    tips.push("Числа делают пароль менее предсказуемым.");
  if (!/[\W_]/.test(password))
    tips.push("Добавьте символы вроде !, @ или # для устойчивости.");
  return tips;
};

const PasswordResult = ({ password, setResults }: PasswordResultProps) => {
  if (!password) return null;

  const strength = getStrength(password);
  const recommendations = getRecommendations(password);

  const strengthData = {
    weak: {
      label: "Слишком простой",
      bar: "w-[30%]",
      bg: "from-red-400 to-red-600",
    },
    medium: {
      label: "Умеренно надёжный",
      bar: "w-[65%]",
      bg: "from-yellow-300 to-yellow-500",
    },
    strong: {
      label: "Надёжный и сложный",
      bar: "w-[100%]",
      bg: "from-emerald-400 to-green-600",
    },
  };

  return (
    <div className="relative mt-6 p-5 rounded-2xl bg-white border shadow-lg max-w-md w-full overflow-hidden group transition-all">
      <div className="absolute -top-5 -right-5 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
      <h2 className="text-xl font-semibold text-gray-800 mb-3 animate-fade-in">
        {strengthData[strength].label}
      </h2>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${strengthData[strength].bg} ${strengthData[strength].bar} transition-all duration-500`}
        ></div>
      </div>
      {strength !== "strong" && (
        <div className="text-sm text-gray-700 animate-fade-in">
          <p className="font-medium mb-1">Как усилить пароль:</p>
          <ul className="ml-4 list-disc space-y-1">
            {recommendations.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-4 pt-2 border-t animate-fade-in">
        Мы не сохраняем и не передаём введённые данные. Проверка происходит
        прямо в вашем браузере.
      </div>
      <MyDangerButton onClick={() => setResults(false)} className="mt-4">
        Назад
      </MyDangerButton>
    </div>
  );
};

export default PasswordResult;
