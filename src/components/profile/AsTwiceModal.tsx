import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import { useRouter } from "next/navigation";

type AsTwiceModalProps = {
  setModalTwice: (arg0: boolean) => void;
};

const AsTwiceModal = ({ setModalTwice }: AsTwiceModalProps) => {
  const { setAuth, setUserInfo } = useContext(contextData);
  const router = useRouter();

  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Вы уверены, что хотите выйти?
        </h2>
        <p className="text-gray-500 mt-2 text-md">
          Ваши изменения будут сохранены.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => {
              setModalTwice(false);
            }}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Отмена
          </button>
          <button
            onClick={() => {
              router.push("/login");
              setAuth(false);
              localStorage.removeItem("userId");
              setUserInfo({});
            }}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsTwiceModal;
