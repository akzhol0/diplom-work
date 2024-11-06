"use client";

import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import MyButtonDanger from "../UI/MyButtonDanger";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ProfileComp() {
  const { userInfo, setAuth, mainLanguage } = useContext(contextData);
  const router = useRouter();

  return (
    <div className="w-full min-h-[70  0px] flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        {userInfo.length !== 0 ? (
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Image
              src="/images/user-img.png"
              alt="user-png"
              width={180}
              height={180}
            />
            <div className="flex flex-col text-lg">
              <p>
                {mainLanguage.profile.name}: {userInfo.userName}
              </p>
              {userInfo.gender !== "Неизвестно" && (
                <p>
                  {mainLanguage.profile.gender}: {userInfo.gender}
                </p>
              )}
              <p>
                {mainLanguage.profile.email}: {userInfo.userLogin}
              </p>
              <p>
                {mainLanguage.profile.role}:{" "}
                {userInfo.role === "user"
                  ? "Обычный пользователь"
                  : "Администратор"}
              </p>
              <span
                onClick={() => {
                  setAuth(false);
                  localStorage.removeItem("userId");
                  router.push("/login");
                }}
              >
                <MyButtonDanger className="font-semibold h-[40px] mt-4 text-red-600">
                  {mainLanguage.profile.btn}
                </MyButtonDanger>
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center">...</p>
        )}
      </div>
    </div>
  );
}

export default ProfileComp;
