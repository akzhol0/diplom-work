import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { contextData } from "@/components/context/context";

const MyGoogleButton = () => {
  const { mainLanguage } = useContext(contextData);

  return (
    <button
      type="button"
      className="flex w-full items-center justify-center py-3 px-6 border rounded-lg
                 duration-300 hover:bg-blue-600 hover:text-white mx-0.5"
    >
      <FcGoogle size={22} />
      <p className="ps-2">{mainLanguage.leftOut.googleBtn}</p>
    </button>
  );
};

export default MyGoogleButton;
