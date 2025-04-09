import React, { useContext, useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import { contextData } from "@/components/context/context";
import Image from "next/image";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";

type HostingResultsProps = {
  results: any;
  setResultsPage: (arg0: boolean) => void;
};

const HostingResults = ({ results, setResultsPage }: HostingResultsProps) => {
  const { mainLanguage } = useContext(contextData);
  const [loaded, setLoaded] = useState(false);

  const [pickedItemIndex, setPickedItemIndex] = useState(0);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    const counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 10; i++) {
      let counterTemp = 0;

      mainLanguage.hostingServiceData[i].questionAnswers.map(
        (questionType: any) => {
          results.map((answerType: any) => {
            if (questionType.answers.includes(answerType)) {
              counterTemp++;
            }
          });
        },
      );

      counter[i] = counterTemp;
    }
    calculate(counter);
  };

  const calculate = (numbers: number[]) => {
    const highest = Math.max(...numbers);

    numbers.forEach((number, index) => {
      if (highest === number) {
        setPickedItemIndex(index - 1);
      }
    });

    setTimeout(() => {
      setLoaded(true);
    }, 1);
  };

  return (
    <div>
      {loaded ? (
        <div className="flex flex-col md:flex-row justify-between">
          <div className="h-auto xl:min-h-[600px] w-full lg:w-[30%] flex justify-center items-center border rounded-lg overflow-hidden">
            <Image
              width={500}
              height={600}
              src={mainLanguage.hostingServiceData[pickedItemIndex].img}
              alt={mainLanguage.hostingServiceData[pickedItemIndex].title}
            />
          </div>
          <div className="w-full lg:w-[70%] flex flex-col justify-between p-2 md:p-4 lg:p-8">
            <div className="">
              <p className="text-3xl font-semibold">
                {mainLanguage.hostingServiceData[pickedItemIndex].title}
              </p>
              <p className="pt-2 text-md lg:text-lg">
                {mainLanguage.hostingServiceData[pickedItemIndex].reason}
              </p>
            </div>
            <div className="w-full flex items-center mt-4 gap-2">
              <div className="w-full" onClick={() => setResultsPage(false)}>
                <MyDangerButton className="w-full">Назад</MyDangerButton>
              </div>
              <a
                className="w-full"
                href={`https://www.google.com/search?q=${mainLanguage.hostingServiceData[pickedItemIndex].title}`}
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

export default HostingResults;
