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
    averageCityQuantity: 0,
  });

  const analyzeFunc = () => {
    // quantity
    setFormState((prev: any) => ({ ...prev, quantity: data.length }));

    // average age
    let age = 0;
    let index = 0;
    data.map((item: any) => {
      age += item.age;
      index += 1;
    });
    setFormState((prev: any) => ({ ...prev, averageAge: age / index }));

    // average name length
    let nameLength = 0;
    let nameIndex = 0;
    data.map((item: any) => {
      nameLength += item.userName.length;
      nameIndex += 1;
    });
    setFormState((prev: any) => ({
      ...prev,
      averageNameLength: nameLength / nameIndex,
    }));

    // average city quantity
  };

  useEffect(() => {
    analyzeFunc();
  }, [loaded]);

  return loaded ? (
    <div className="flex flex-col">
      <p>quantity: {formState.quantity}</p>
      <p>avg: {formState.averageAge}</p>
      <p>avg name length: {formState.averageNameLength}</p>
    </div>
  ) : (
    <LoadingUI />
  );
};

export default Filter;
