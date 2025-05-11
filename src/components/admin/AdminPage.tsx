"use client";

import React, { useContext, useEffect } from "react";
import { contextData } from "@/components/context/context";
import { useRouter } from "next/navigation";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import Link from "next/link";

const AdminPage = () => {
  const { userInfo, isAuth } = useContext(contextData);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth || !userInfo) {
      userInfo?.role !== "admin" && router.push("/");
    }
  }, []);

  return isAuth ? (
    <div>
      <div>Страница Админа</div>
    </div>
  ) : (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-3xl text-center font-semibold">
        Вам запрещен вход в эту страницу
      </div>
      <Link href="/">
        <MyDangerButton>В главную страницу</MyDangerButton>
      </Link>
    </div>
  );
};

export default AdminPage;
