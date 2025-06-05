"use client";

import React, { useState } from "react";
import { ru } from "../../../language/ru";
import ResSingleItem from "@/components/servicesPage/service-types/resserv/ResSingleItem";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import Link from "next/link";
import ResResultPage from "@/components/servicesPage/service-types/resserv/ResResultPage";

const ReserveComp = () => {
  const [stateForm, setStateForm] = useState({
    first: {
      question: "",
      answer: "",
    },
    second: {
      question: "",
      answer: "",
    },
    third: {
      question: "",
      answer: "",
    },
    fourth: {
      question: "",
      answer: "",
    },
    fifth: {
      question: "",
      answer: "",
    },
    sixth: {
      question: "",
      answer: "",
    },
    seventh: {
      question: "",
      answer: "",
    },
    eighth: {
      question: "",
      answer: "",
    },
    ninth: {
      question: "",
      answer: "",
    },
    tenth: {
      question: "",
      answer: "",
    },
  });
  const [resultPage, setResultPage] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (item: any) => {
    const { question, answer, name } = item;
    setStateForm((prevState) => ({
      ...prevState,
      [name]: { question: question, answer: answer },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Object.values(stateForm).some((item) => {
      if (item.answer.trim() === "") {
        setError("Пажалуйста ответьте на все вопросы!");
        return;
      }
      setResultPage(true);
    });
  };

  return resultPage ? (
    <ResResultPage setResultPage={setResultPage} results={stateForm} />
  ) : (
    <div>
      <p className="text-3xl font-semibold text-center mb-6">
        Выбора инструмента резервного копирования
      </p>
      <form onSubmit={handleSubmit}>
        {ru.copyReserved.questions.map((item: any) => (
          <ResSingleItem
            stateForm={stateForm}
            handleChange={handleChange}
            key={item.id}
            item={item}
          />
        ))}
        <div className="text-center text-red-600 mt-4">{error}</div>
        <div className="flex justify-center gap-2 mt-4">
          <Link href={"/services"}>
            <MyDangerButton className="px-8">Назад</MyDangerButton>
          </Link>
          <MyPrimaryButton type={"submit"} className="px-8">
            Продолжить
          </MyPrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ReserveComp;
