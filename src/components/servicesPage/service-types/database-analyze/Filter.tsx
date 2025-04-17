import React, { useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";

type FilterProps = {
  data: any;
  loaded: boolean;
};

const Filter = ({ data, loaded }: FilterProps) => {
  const [formState, setFormState] = useState<any>({
    quantity: 0,
    averageAge: 0,
    averageNameLength: 0,
    averageTimeFromRegs: 0,
    locationDistribution: {},
    genderDistribution: {
      male: 0,
      female: 0,
    },
    malePercentage: 0,
    femalePercentage: 0,
  });

  const analyzeFunc = () => {
    getQuantity();
    getAverageAge();
    getAverageNameLength();
    getAverageRegistrationTime();
    getLocationDisctribution();
    getWomanMen();
  };

  const getQuantity = () => {
    setFormState((prev: any) => ({ ...prev, quantity: data.length }));
  };

  const getAverageAge = () => {
    const totalAge = data.reduce(
      (sum: any, user: any) => sum + Number(user.age || 0),
      0,
    );
    const result = +(totalAge / data.length).toFixed(2);
    setFormState((prev: any) => ({ ...prev, averageAge: result }));
  };

  const getAverageNameLength = () => {
    const totalLength = data.reduce((sum: number, user: any) => {
      const name = user.userName || "";
      return sum + name.length;
    }, 0);

    const result = +(totalLength / data.length).toFixed(2);
    setFormState((prev: any) => ({ ...prev, averageNameLength: result }));
  };

  const getAverageRegistrationTime = () => {
    const now = new Date();

    const totalDays = data.reduce((sum: number, user: any) => {
      const birthDate = new Date(user.birthdate);
      const diffTime = now.getTime() - birthDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24); // миллисекунды → дни
      return sum + diffDays;
    }, 0);

    const avgDays = totalDays / data.length;

    setFormState((prev: any) => ({
      ...prev,
      averageTimeFromRegs: Math.round(avgDays),
    }));
  };

  const getLocationDisctribution = () => {
    const locationDistribution: Record<string, number> = {};

    data.forEach((user: any) => {
      const loc = user.location;
      locationDistribution[loc] = (locationDistribution[loc] || 0) + 1;
    });

    setFormState((prev: any) => ({
      ...prev,
      locationDistribution,
    }));
  };

  const getWomanMen = () => {
    const maleCount = data.filter(
      (user: any) => user.gender.toLowerCase() === "мужчина",
    ).length;
    const femaleCount = data.filter(
      (user: any) => user.gender.toLowerCase() === "женщина",
    ).length;

    const totalUsers = data.length;

    const malePercentage = (maleCount / totalUsers) * 100;
    const femalePercentage = (femaleCount / totalUsers) * 100;

    setFormState((prev: any) => ({
      ...prev,
      genderDistribution: {
        male: maleCount,
        female: femaleCount,
      },
      malePercentage,
      femalePercentage,
    }));
  };

  useEffect(() => {
    analyzeFunc();
  }, [loaded]);

  return loaded ? (
    <div className="flex flex-col gap-4">
      <p>quantity: {formState.quantity} пользователей</p>
      <p>avg age: {formState.averageAge} лет</p>
      <p>avg name length: {formState.averageNameLength} слов</p>
      <p>avg time from registration {formState.averageTimeFromRegs} минут</p>
      <div>
        <p>Распределение по регионам:</p>
        <ul className="max-h-[150px] overflow-x-scroll">
          {Object.entries(formState.locationDistribution).map(
            ([loc, count]) => (
              <li key={loc}>
                {loc}: {count} пользователь(ей)
              </li>
            ),
          )}
        </ul>
      </div>
      <div>
        <h1>Распределение по полу</h1>
        <p>
          Мужчин: {formState.genderDistribution.male} (
          {formState.malePercentage.toFixed(2)}%)
        </p>
        <p>
          Женщин: {formState.genderDistribution.female} (
          {formState.femalePercentage.toFixed(2)}%)
        </p>
      </div>
    </div>
  ) : (
    <LoadingUI />
  );
};

export default Filter;
