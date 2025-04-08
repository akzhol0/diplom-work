import React, { useContext, useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import SingleItem from "@/components/servicesPage/service-types/antivirus/SingleItem";
import { contextData } from "@/components/context/context";
import { questionTypes } from "@/components/types/types";
import AntivirusResults from "@/components/servicesPage/service-types/antivirus/AntivirusResults";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";

const AntiOptions = () => {
  const { mainLanguage } = useContext(contextData);
  const [nextStage, setNextStage] = useState(true);
  const [answers, setAnswers] = useState<questionTypes[]>([]);
  const [resultsPage, setResultsPage] = useState(false);

  const [state, setState] = useState({
    usedByWho: "",
    operationSystem: "",
    threatLevelMidnight: "",
    quantity: "",
    dateType: "",
    fishingAttack: "",
    mailProtection: "",
    threatType: "",
    vpnyes: "",
    before: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setAnswers([]);
    e.preventDefault();

    const isAnyFieldEmpty = Object.values(state).some((value) => value === "");

    if (isAnyFieldEmpty) {
      setError("Пажалуйста заполните все поля.");
    } else {
      setNextStage(!nextStage);

      const obj = [
        {
          id: 1,
          question: "Это решение для личного использования или для компании?",
          answer: state.usedByWho,
        },
        {
          id: 2,
          question: "Какая операционная система?",
          answer: state.operationSystem,
        },
        {
          id: 3,
          question: "Какой уровень защиты необходим?",
          answer: state.threatLevelMidnight,
        },
        {
          id: 4,
          question: "Сколько серверов или устройств нужно защитить?",
          answer: state.quantity,
        },
        {
          id: 5,
          question: "Какие данные нужно защищить?",
          answer: state.dateType,
        },
        {
          id: 6,
          question:
            "Требуется ли вам защита от шпионского ПО или фишинговых атак?",
          answer: state.fishingAttack,
        },
        {
          id: 7,
          question: "Нужна ли защита для электронной почты?",
          answer: state.mailProtection,
        },
        {
          id: 8,
          question: "Какие именно угрозы вас беспокоят?",
          answer: state.threatType,
        },
        {
          id: 9,
          question:
            "Используете ли вы VPN или другие инструменты для безопасности?",
          answer: state.vpnyes,
        },
        {
          id: 10,
          question: "Какие антивирусы вы использовали до этого?",
          answer: state.before,
        },
      ];

      obj.map((item: questionTypes) => {
        setAnswers((prev: any) => [...prev, item]);
      });
    }
  };

  return (
    <div>
      {nextStage ? (
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <p className="text-[14px] lg:text-[25px] font-semibold text-center mb-4">
            Нужно ответить на все вопросы чтобы выявить <br /> наилучший
            антивирус именно для вас
          </p>
          <SingleItem
            item={mainLanguage.antivirus[0]}
            handleChange={handleChange}
            state={state.usedByWho}
          />
          <SingleItem
            item={mainLanguage.antivirus[1]}
            handleChange={handleChange}
            state={state.operationSystem}
          />
          <SingleItem
            item={mainLanguage.antivirus[2]}
            handleChange={handleChange}
            state={state.threatLevelMidnight}
          />
          <SingleItem
            item={mainLanguage.antivirus[3]}
            handleChange={handleChange}
            state={state.quantity}
          />
          <SingleItem
            item={mainLanguage.antivirus[4]}
            handleChange={handleChange}
            state={state.dateType}
          />
          <SingleItem
            item={mainLanguage.antivirus[5]}
            handleChange={handleChange}
            state={state.fishingAttack}
          />
          <SingleItem
            item={mainLanguage.antivirus[6]}
            handleChange={handleChange}
            state={state.mailProtection}
          />
          <SingleItem
            item={mainLanguage.antivirus[7]}
            handleChange={handleChange}
            state={state.threatType}
          />
          <SingleItem
            item={mainLanguage.antivirus[8]}
            handleChange={handleChange}
            state={state.vpnyes}
          />
          <SingleItem
            item={mainLanguage.antivirus[9]}
            handleChange={handleChange}
            state={state.before}
          />
          <MyPrimaryButton className="mt-6" type="submit">
            Продолжить
          </MyPrimaryButton>
          <p className="text-red-600 mt-2">{error}</p>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center">
          {resultsPage ? (
            <AntivirusResults setNextStage={setNextStage} answers={answers} />
          ) : (
            <>
              <p className="text-[16px] lg:text-[25px] font-semibold text-center mb-4">
                Ваш выбор.
              </p>
              {answers.length > 0 && (
                <div className="text-md">
                  {answers.map((item: questionTypes) => (
                    <div key={item.id} className="mb-3 flex text-lg">
                      <div className="w-[1000px] border-b rounded pb-2 flex justify-between text-md">
                        <p>
                          {item.id}. {item.question}:
                        </p>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-4">
                <div onClick={() => setNextStage(true)}>
                  <MyDangerButton className="mt-2">Назад</MyDangerButton>
                </div>
                <div onClick={() => setResultsPage(true)}>
                  <MyPrimaryButton className="mt-2">Продолжить</MyPrimaryButton>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AntiOptions;
