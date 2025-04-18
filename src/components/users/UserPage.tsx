"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import Image from "next/image";
import UserFeedbacks from "@/components/feedback/UserFeedbacks";
import { UserInfoTypes } from "@/components/types/types";

type UserPageProps = {
  token: string;
};

const UserPage = ({ token }: UserPageProps) => {
  const { mainLanguage, users } = useContext(contextData);

  const [user, setUser] = useState<UserInfoTypes>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    users.length !== 0 && findUser();
  }, [users]);

  const findUser = () => {
    users.map((item: any) => {
      if (item.userId === token) {
        setUser(item as UserInfoTypes);
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
                  user?.gender === "Женщина"
                    ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3o5Z3g3OHRlN210bzBocHhqdHV0MXBibHJqdjlndGh3NzI5dmY4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L9fiOLupBnbMiKbXdJ/giphy.gif"
                    : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3RocXA3bGEwZXpuZzh5b3Y3aDdjY3NvaTlkZTFoczY2OWxxMHF3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/F5YTPX0RukZe4KYTGS/giphy.gif"
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
                <p>
                  {mainLanguage.rest.birth}: {user?.birthdate}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl border-t border-red-600 mt-6 pt-4 text-center">
                {mainLanguage.rest.feedsUser} {user?.userName}
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
