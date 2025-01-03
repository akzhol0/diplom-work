"use client";

import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import Link from "next/link";

function ProfileComp() {
  const { userInfo, setAuth, mainLanguage } = useContext(contextData);
  const router = useRouter();

  return userInfo.length !== 0 ? (
    <div className="flex flex-col md:flex-row gap-4 items-center ">
      <Image
        src={
          userInfo.image.includes("https") || userInfo.image.includes("http")
            ? userInfo.image
            : "/images/user-img.png"
        }
        alt="user-png"
        width={180}
        height={180}
        priority={true}
      />
      <div className="flex flex-col text-lg">
        <p>
          {mainLanguage.profile.name}: {userInfo.userName}
        </p>
        {userInfo.gender !== "Не хочу говорить" && (
          <p>
            {mainLanguage.profile.gender}: {userInfo.gender}
          </p>
        )}
        <p>
          {mainLanguage.profile.email}: {userInfo.userLogin}
        </p>
        <p>
          {mainLanguage.profile.role}:{" "}
          {userInfo.role === "user" ? "Обычный пользователь" : "Администратор"}
        </p>
        <div className="flex gap-2 my-2">
          <Link href="/edit">
            <MyPrimaryButton className="font-semibold h-[40px]">
              {mainLanguage.edit.btn}
            </MyPrimaryButton>
          </Link>
          <span
            onClick={() => {
              setAuth(false);
              localStorage.removeItem("userId");
              router.push("/login");
            }}
          >
            <MyButtonDanger className="font-semibold h-[40px]">
              {mainLanguage.profile.btn}
            </MyButtonDanger>
          </span>
          <Link href="/feedback">
            <MyPrimaryButton className="font-semibold h-[40px]">
              {mainLanguage.feedback.btn}
            </MyPrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <LoadingUI />
  );
}

export default ProfileComp;
