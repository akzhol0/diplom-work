"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import Image from "next/image";
import UserFeedbacks from "@/components/feedback/UserFeedbacks";
import { UserInfoTypes } from "@/components/types/types";
import FriendsModal from "@/components/UI/modals/FriendsModal";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import { useRouter } from "next/navigation";

type UserPageProps = {
  token: string;
};

const UserPage = ({ token }: UserPageProps) => {
  const { mainLanguage, users, userInfo, auth } = useContext(contextData);
  const [friendsModal, setFriendsModal] = useState(false);
  const [isFriends, setIsFriends] = useState(false);
  const router = useRouter();

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
      auth && checkIfTheyAreFriends();
    });
    setLoaded(true);
  };

  const checkIfTheyAreFriends = async () => {
    userInfo.friends.map((item: any) => {
      if (token === item.log) {
        setIsFriends(true);
      }
    });
  };

  const addFriend = async (move: string) => {
    const docRef = doc(db, "users", `${userInfo?.userId}`);
    const docRefSecond = doc(db, "users", `${token}`);
    const updateAction = move === "add" ? arrayUnion : arrayRemove;

    if (move === "add") {
      userInfo.friends.push(token);
      setIsFriends(true);
    } else {
      userInfo.friends.filter((item: any) => item.log !== token);
      setIsFriends(false);
    }

    addSecondRef(docRefSecond, updateAction);

    const log = token;
    await updateDoc(docRef, {
      friends: updateAction({
        log,
      }),
    });

    window.location.reload();
  };

  const addSecondRef = async (docRefSecond: any, updateAction: any) => {
    const log = userInfo.userId;
    await updateDoc(docRefSecond, {
      friends: updateAction({
        log,
      }),
    });
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
                <div className="flex">
                  <div
                    onClick={() => setFriendsModal(true)}
                    className="w-auto border-white border-b hover:border-b hover:border-black cursor-pointer"
                  >
                    Друзья: {user?.friends.length}
                  </div>
                </div>
                <div className="mt-1">
                  {auth &&
                    (token !== userInfo.userId && !isFriends ? (
                      <div onClick={() => addFriend("add")}>
                        <MyPrimaryButton className="text-[16px] font-semibold">
                          Добавить в друзья
                        </MyPrimaryButton>
                      </div>
                    ) : (
                      token !== userInfo.userId && (
                        <div onClick={() => addFriend("remove")}>
                          <MyDangerButton className="text-[16px] font-semibold">
                            Удалить из друзей
                          </MyDangerButton>
                        </div>
                      )
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl border-t border-red-600 mt-6 pt-4 text-center">
                {mainLanguage.rest.feedsUser} {user?.userName}
              </div>
              <UserFeedbacks userToken={token} />
            </div>
            {friendsModal && (
              <FriendsModal user={user} setFriendsModal={setFriendsModal} />
            )}
          </div>
        ) : (
          <LoadingUI />
        )}
      </div>
    </div>
  );
};

export default UserPage;
