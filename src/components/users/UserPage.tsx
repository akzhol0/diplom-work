"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import Image from "next/image";
import UserFeedbacks from "@/components/portfolio/UserFeedbacks";
import { UserInfoTypes } from "@/components/types/types";

type UserPageProps = {
  token: string;
};

const UserPage = ({ token }: UserPageProps) => {
  const { feedbacks, mainLanguage, loadedFeedbacks } = useContext(contextData);

  const [user, setUser] = useState<UserInfoTypes>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadedFeedbacks && findUser();
  }, [loadedFeedbacks]);

  const findUser = () => {
    feedbacks.map((item: any) => {
      if (item.feedbackUserInfo.userId === token) {
        setUser(item.feedbackUserInfo as UserInfoTypes);
      }
    });
    setLoaded(true);
  };

  return (
    <div className="w-full min-h-[700px] flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        {loaded ? (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-4 items-center ">
              <Image
                src={
                  user?.image.includes("https") || user?.image.includes("http")
                    ? user?.image
                    : "/images/user-img.png"
                }
                alt="user-png"
                width={180}
                height={180}
                priority={true}
              />
              <div className="flex flex-col text-lg">
                <p>
                  {mainLanguage.profile.name}: {user?.userName}
                </p>
                {user?.gender !== "Не хочу говорить" && (
                  <p>
                    {mainLanguage.profile.gender}: {user?.gender}
                  </p>
                )}
                <p>
                  {mainLanguage.profile.email}: {user?.userLogin}
                </p>
                <p>
                  {mainLanguage.profile.role}:{" "}
                  {user?.role === "user"
                    ? "Обычный пользователь"
                    : "Администратор"}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl border-t border-red-600 mt-6 pt-4 text-center">
                Отзывы {user?.userName}
              </div>
              <UserFeedbacks userToken={token} />
            </div>
          </div>
        ) : (
          <LoadingUI />
        )}
      </div>
    </div>
  );
};

export default UserPage;
