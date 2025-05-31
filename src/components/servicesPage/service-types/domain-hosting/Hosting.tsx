import React, { useContext, useState } from "react";
import { contextData } from "@/components/context/context";
import HostItem from "@/components/servicesPage/service-types/domain-hosting/HostItem";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import HostingResults from "@/components/servicesPage/service-types/domain-hosting/HostingResults";
import { ru } from "@/components/language/ru";

type HostingProps = {
  domainName: string;
};

const Hosting = ({ domainName }: HostingProps) => {
  const [mainLanguage, setMainLanguage] = useState<any>(ru);
  const [formState, setFormState] = useState<any>({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
    seventh: "",
    eighth: "",
    ninth: "",
    tenth: "",
  });
  const [error, setError] = useState("");
  const [resultsPage, setResultsPage] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState<any>([]);

  const handleChange = (field: any, value: string) => {
    setFormState((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAnyFieldEmpty = Object.values(formState).some(
      (value) => value === "",
    );
    if (isAnyFieldEmpty) {
      setError("Пажалуйста заполните все поля!");
      return;
    }

    const valuesArray = Object.values(formState);
    valuesArray.map((item: any) => {
      setFinalAnswers((prev: any) => [...prev, item]);
    });

    setResultsPage(true);
  };

  return resultsPage ? (
    <div>
      <p className="text-3xl font-semibold mt-2 text-center">Результаты:</p>
      <HostingResults
        domainName={domainName}
        setResultsPage={setResultsPage}
        results={finalAnswers}
      />
    </div>
  ) : (
    <div>
      <p className="text-3xl font-semibold mt-2 text-center">
        Выбор хостинг сервиса:
      </p>
      <p className="text-sm text-center">Домен: {domainName}</p>
      <form className="mt-2" onSubmit={handleSubmit}>
        {mainLanguage.hostingDataQuestions.map((item: any) => (
          <HostItem
            formState={formState}
            key={item.id}
            item={item}
            handleChange={handleChange}
          />
        ))}
        <div className="flex justify-center">
          <MyPrimaryButton className="my-4" type="submit">
            Продолжить
          </MyPrimaryButton>
        </div>
        <p className="text-red-600 text-center">{error}</p>
      </form>
    </div>
  );
};

export default Hosting;
