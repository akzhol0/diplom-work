import React, { useContext } from "react";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import { contextData } from "@/components/context/context";

type MyErrorModalProps = {
  reset: () => void;
};

const MyErrorModal = ({ reset }: MyErrorModalProps) => {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="flex flex-col items-center py-[200px]">
      <h2 className="text-center">{mainLanguage.rest.errorMessage}</h2>
      <span className="mt-2" onClick={() => reset()}>
        <MyDangerButton className="px-8">
          {mainLanguage.rest.errorReload}
        </MyDangerButton>
      </span>
    </div>
  );
};

export default MyErrorModal;
