import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import { questionTypes } from "@/components/types/types";
import Image from "next/image";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";

type AntivirusResultsProps = {
  answers: questionTypes[];
  setNextStage: (arg0: boolean) => void;
};

const AntivirusResults = ({ answers, setNextStage }: AntivirusResultsProps) => {
  const { mainLanguage } = useContext(contextData);

  const [finish, setFinish] = useState(false);
  const [pickedItemIndex, setPickedItemIndex] = useState(0);

  function getResults() {
    const counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 10; i++) {
      let counterTemp = 0;

      mainLanguage.antivirusDataTypes[i].questionTypes.map(
        (questionType: any) => {
          answers.map((answerType: any) => {
            if (questionType.answer.includes(answerType.answer)) {
              counterTemp++;
            }
          });
        },
      );

      counter[i] = counterTemp;
    }

    calculate(counter);
  }

  const calculate = (numbers: number[]) => {
    const highest = Math.max(...numbers);

    numbers.forEach((number, index) => {
      if (highest === number) {
        setPickedItemIndex(index - 1);
      }
    });

    setTimeout(() => {
      setFinish(true);
    }, 3000);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <p className="text-[20px] lg:text-[25px] font-semibold text-center mb-4">
        Результаты:
      </p>
      {finish ? (
        <div className="flex flex-col md:flex-row justify-between">
          <div className="h-auto xl:min-h-[600px] w-full lg:w-[30%] flex justify-center items-center border rounded-lg overflow-hidden">
            <Image
              width={500}
              height={600}
              src={mainLanguage.antivirusDataTypes[pickedItemIndex].image}
              alt={mainLanguage.antivirusDataTypes[pickedItemIndex].title}
            />
          </div>
          <div className="w-full lg:w-[70%] flex flex-col justify-between p-2 md:p-4 lg:p-8">
            <div className="">
              <p className="text-3xl font-semibold">
                {mainLanguage.antivirusDataTypes[pickedItemIndex].title}
              </p>
              <p className="pt-2 text-md lg:text-lg">
                {mainLanguage.antivirusDataTypes[pickedItemIndex].reason}
              </p>
            </div>
            <div className="w-full flex items-center mt-4 gap-2">
              <div className="w-full" onClick={() => setNextStage(true)}>
                <MyDangerButton className="w-full">Назад</MyDangerButton>
              </div>
              <a
                className="w-full"
                href={`https://www.google.com/search?q=${mainLanguage.antivirusDataTypes[pickedItemIndex].title}`}
                target="_blank"
              >
                <MyPrimaryButton className="w-full">
                  Побольше информаций
                </MyPrimaryButton>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <LoadingUI />
      )}
    </div>
  );
};

export default AntivirusResults;
