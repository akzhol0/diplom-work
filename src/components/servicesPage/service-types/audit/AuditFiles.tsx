import React from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import Link from "next/link";

const AuditFiles = () => {
  return (
    <div>
      <div className="text-xl md:text-3xl font-semibold text-center">
        Проверка файлов или сайтов на безопасность
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex shadow-md p-10 rounded-lg">
          <div className="flex flex-col items-center space-y-2 border-e border-black pe-5">
            <p className="text-lg">Проверка файла на вирусы</p>
            <Link href="/services/audit/check-file">
              <MyPrimaryButton>Продолжить</MyPrimaryButton>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-2 border-l border-black ps-5">
            <p className="text-lg">Проверка веб-сайта</p>
            <Link href="/services/audit/check-website">
              <MyPrimaryButton>Продолжить</MyPrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditFiles;
