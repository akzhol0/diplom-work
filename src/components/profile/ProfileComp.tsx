"use client";

import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import Link from "next/link";
import UserFeedbacks from "@/components/portfolio/UserFeedbacks";

function ProfileComp() {
  const { userInfo, setAuth, mainLanguage, setUserInfo, auth } =
    useContext(contextData);
  const router = useRouter();

  return auth ? (
    <div className="flex flex-col">
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
            {userInfo.role === "user"
              ? "Обычный пользователь"
              : "Администратор"}
          </p>
          <p>Дата рождения: {userInfo.birthdate}</p>
          <div className="flex flex-col lg:flex-row gap-2 my-2">
            <Link href="/edit">
              <MyPrimaryButton className="font-semibold h-[40px] whitespace-nowrap">
                {mainLanguage.edit.btn}
              </MyPrimaryButton>
            </Link>
            <span
              onClick={() => {
                router.push("/login");
                setAuth(false);
                localStorage.removeItem("userId");
                setUserInfo({});
              }}
            >
              <MyButtonDanger className="font-semibold h-[40px] whitespace-nowrap">
                {mainLanguage.profile.btn}
              </MyButtonDanger>
            </span>
            <Link href="/feedback">
              <MyPrimaryButton className="font-semibold h-[40px] whitespace-nowrap">
                {mainLanguage.feedback.btn}
              </MyPrimaryButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-2xl border-t border-red-600 mt-6 pt-4 text-center">
          Отзывы {userInfo.userName}
        </div>
        <UserFeedbacks userToken={userInfo.userId} />
      </div>
    </div>
  ) : (
    <LoadingUI />
  );
}

export default ProfileComp;
