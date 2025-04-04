"use client";

import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import { useRouter } from "next/navigation";

type AsTwiceModalProps = {
  setModalTwice: (arg0: boolean) => void;
};

const AsTwiceModal = ({ setModalTwice }: AsTwiceModalProps) => {
  const { setAuth, setUserInfo } = useContext(contextData);
  const router = useRouter();
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {mainLanguage.rest.asSure}
        </h2>
        <p className="text-gray-500 mt-2 text-md">
          {mainLanguage.rest.asSaved}
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => {
              setModalTwice(false);
            }}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            {mainLanguage.rest.asCancel}
          </button>
          <button
            onClick={() => {
              router.push("/");
              setAuth(false);
              localStorage.removeItem("userId");
              setUserInfo({});
            }}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            {mainLanguage.rest.asLeave}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsTwiceModal;
