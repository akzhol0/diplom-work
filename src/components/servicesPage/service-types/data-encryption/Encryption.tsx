"use client";

import React, { useState } from "react";
import { ru } from "@/components/language/ru";
import Link from "next/link";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import EncryptItem from "@/components/servicesPage/service-types/data-encryption/EncryptItem";
import EncResultPage from "@/components/servicesPage/service-types/data-encryption/EncResultPage";

const Encryption = () => {
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
    <EncResultPage setResultPage={setResultPage} results={stateForm} />
  ) : (
    <div>
      <p className="text-3xl font-semibold text-center mb-6">
        Выбора метода шифрования
      </p>
      <form onSubmit={handleSubmit}>
        {ru.dataEncryption.questions.map((item: any) => (
          <EncryptItem
            handleChange={handleChange}
            stateForm={stateForm}
            item={item}
            key={item.id}
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

export default Encryption;
