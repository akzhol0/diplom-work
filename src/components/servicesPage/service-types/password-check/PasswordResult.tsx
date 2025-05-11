import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";
import { useEffect, useState } from "react";

type PasswordResultProps = {
  password: string;
  setResults: (arg0: boolean) => void;
};

const commonPasswords = [
  "123456",
  "123456789",
  "qwerty",
  "password",
  "111111",
  "123123",
  "admin",
  "abc123",
  "iloveyou",
  "1234",
  "000000",
  "password1",
  "qwerty123",
  "1q2w3e4r",
  "asdfgh",
  "zaq12wsx",
  "letmein",
  "welcome",
];

type Strength = "weak" | "medium" | "strong";

const getStrength = (password: string): Strength => {
  const normalized = password.toLowerCase();
  const isCommonPassword = commonPasswords.includes(normalized);

  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);

  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;

  if (isCommonPassword) return "weak";
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
  if (password === "") return null;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  const strength = getStrength(password);
  const recommendations = getRecommendations(password);

  const strengthData = {
    weak: {
      label: "Слишком простой",
      bar: "w-[30%]",
      bg: "from-red-400 to-red-600",
      description:
        "Ваш пароль довольно уязвим: он либо короткий, либо содержит только простые символы. Такой пароль легко подобрать с помощью автоматических алгоритмов. Рекомендуется добавить заглавные буквы, цифры и символы, а также увеличить длину до 12+ символов. Это повысит стойкость к взлому и защитит ваши личные данные.",
    },
    medium: {
      label: "Умеренно надёжный",
      bar: "w-[65%]",
      bg: "from-yellow-300 to-yellow-500",
      description:
        "Пароль обладает базовым уровнем защиты. Он уже содержит некоторые разнообразные символы, но может быть уязвим для более продвинутых атак. Чтобы повысить устойчивость, желательно сделать его длиннее и добавить как минимум один специальный символ. Такой подход значительно усложнит задачу злоумышленникам.",
    },
    strong: {
      label: "Надёжный и сложный",
      bar: "w-[100%]",
      bg: "from-emerald-400 to-green-600",
      description:
        "Отличный выбор! Ваш пароль длинный и содержит разнообразные символы, что делает его стойким ко многим типам атак — от перебора до словарных методов. Тем не менее, не используйте его повторно на разных сайтах. Использование менеджера паролей также остаётся хорошей практикой.",
    },
  };

  return loaded ? (
    <div className="w-full lg:w-[60%] space-y-4 p-5 rounded-xl border">
      <p className="text-2xl font-semibold text-gray-800 animate-fade-in">
        {strengthData[strength].label}
      </p>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${strengthData[strength].bg} ${strengthData[strength].bar} transition-all duration-500`}
        ></div>
      </div>
      <p className="text-sm text-gray-700 animate-fade-in">
        {strengthData[strength].description}
      </p>
      {commonPasswords.includes(password.toLowerCase()) && (
        <div className="mt-2 p-3 text-sm text-red-600 bg-red-100 rounded-xl animate-fade-in">
          Этот пароль — <b>слишком популярный</b> и легко угадывается. Даже при
          наличии цифр или символов он остаётся уязвимым. Используйте уникальную
          фразу, не встречающуюся в общедоступных списках.
        </div>
      )}
      {strength !== "strong" && (
        <div className="text-sm text-gray-700 animate-fade-in">
          <p className="font-medium mb-2">Как усилить пароль:</p>
          <ul className="ml-4 list-disc space-y-1">
            {recommendations.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="text-xs text-gray-500 pt-2 border-t animate-fade-in">
        Мы не сохраняем и не передаём введённые данные. Проверка происходит
        прямо в вашем браузере.
      </div>
      <MyDangerButton onClick={() => setResults(false)} className="mt-4">
        Назад
      </MyDangerButton>
    </div>
  ) : (
    <LoadingUi />
  );
};

export default PasswordResult;
