import React from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import Link from "next/link";

const AuditFiles = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800">
        Проверка файлов и сайтов на безопасность
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
          <p className="text-lg font-medium text-gray-700 mb-4">
            Проверка файла на вирусы
          </p>
          <Link href="/services/audit/check-file">
            <MyPrimaryButton>Продолжить</MyPrimaryButton>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
          <p className="text-lg font-medium text-gray-700 mb-4">
            Проверка веб-сайта
          </p>
          <Link href="/services/audit/check-website">
            <MyPrimaryButton>Продолжить</MyPrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuditFiles;
