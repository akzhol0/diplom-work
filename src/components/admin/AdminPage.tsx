"use client";

import React, { useContext, useEffect } from "react";
import { contextData } from "@/components/context/context";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { userInfo, isAuth } = useContext(contextData);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth && !userInfo) {
      userInfo?.role !== "admin" && router.push("/");
    }
  }, [userInfo]);

  return (
    <div>
      <div className="">hello</div>
    </div>
  );
};

export default AdminPage;
