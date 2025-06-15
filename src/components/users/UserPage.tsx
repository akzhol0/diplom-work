"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import Image from "next/image";
import UserFeedbacks from "@/components/feedback/UserFeedbacks";
import { UserInfoTypes } from "@/components/types/types";
import FriendsModal from "@/components/users/FriendsModal";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/components/firebase/config";
import UserWriteFunction from "@/components/users/userWriteFunction";
import ForumItem from "@/components/forum/ForumItem";

type UserPageProps = {
  token: string;
};

const UserPage = ({ token }: UserPageProps) => {
  const { mainLanguage, users, userInfo, isAuth, allUsersMessages } =
    useContext(contextData);
  const [friendsModal, setFriendsModal] = useState(false);
  const [isFriends, setIsFriends] = useState(false);
  const [user, setUser] = useState<UserInfoTypes>();
  const [writeModal, setWriteModal] = useState(false);
  const [docId, setDocId] = useState<string>("");
  const [userForumTab, setUserForumTab] = useState<any>(null);
  const [error, setError] = useState("");

  const getAllForumItems = async () => {
    const q = query(collection(db, "forum"), orderBy("count", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().authorId === user?.userId) {
        setUserForumTab(doc.data());
      }
    });
  };

  useEffect(() => {
    users.length !== 0 && findUser();
  }, [users]);

  useEffect(() => {
    user && getAllForumItems();
  }, [user]);

  const findUser = () => {
    users.map((item: any) => {
      if (item.userId === token) {
        setUser(item as UserInfoTypes);

        isAuth && checkIfTheyAreFriends();
        isAuth && checkIfTheyMessagedEachOther(item);
      }
    });
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

  const checkIfTheyMessagedEachOther = async (usercb: UserInfoTypes) => {
    allUsersMessages.map((item: any) => {
      if (
        item.id.includes(userInfo.userId) &&
        item.id.includes(usercb?.userId)
      ) {
        setDocId(item.id);
      }
    });
  };

  const formatTime = (timestamp: number | string): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      day: "2-digit",
      month: "long",
    };

    return date.toLocaleString("ru-RU", options).replace(",", "");
  };

  return (
    <div className="w-full min-h-[700px] flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        {user ? (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-4 items-center ">
              <Image
                src={user.image}
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
                    ? mainLanguage.leftOut.user
                    : mainLanguage.leftOut.admin}
                </p>
                {user?.birthdate !== "Неизвестно" && (
                  <p>
                    {mainLanguage.rest.birth}: {formatTime(user?.birthdate)}
                  </p>
                )}
                <div className="flex">
                  <div
                    onClick={() => setFriendsModal(true)}
                    className="w-auto border-white border-b hover:border-b hover:border-black cursor-pointer"
                  >
                    {mainLanguage.leftOut.friends}: {user?.friends.length}
                  </div>
                </div>
                <div className="flex gap-2 text-[16px] font-semibold mt-1">
                  {isAuth &&
                    (token !== userInfo.userId && !isFriends ? (
                      <div onClick={() => addFriend("add")}>
                        <MyPrimaryButton>
                          {mainLanguage.leftOut.addToFriends}
                        </MyPrimaryButton>
                      </div>
                    ) : (
                      token !== userInfo.userId && (
                        <div onClick={() => addFriend("remove")}>
                          <MyDangerButton>
                            {mainLanguage.leftOut.deleteFromFriends}
                          </MyDangerButton>
                        </div>
                      )
                    ))}
                  {isAuth && token !== userInfo.userId && (
                    <div onClick={() => setWriteModal(!writeModal)}>
                      <MyPrimaryButton>
                        {mainLanguage.leftOut.write}
                      </MyPrimaryButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl border-t border-red-600 mt-6 pt-4 text-center">
                {mainLanguage.rest.feedsUser} {user?.userName}
              </div>
              <UserFeedbacks user={user} userToken={token} />
              {userForumTab && (
                <div>
                  <p className="text-2xl py-4 text-center">
                    {mainLanguage.leftOut.forum} {user.userName}
                  </p>
                  <ForumItem
                    getAllForumItems={getAllForumItems}
                    item={userForumTab}
                    setError={setError}
                  />
                </div>
              )}
            </div>
            {friendsModal && (
              <FriendsModal user={user} setFriendsModal={setFriendsModal} />
            )}
            {writeModal && (
              <UserWriteFunction
                receivingUser={user}
                sendingUser={userInfo}
                setWriteModal={setWriteModal}
                docId={docId === "" ? "null" : docId}
                findUser={findUser}
              />
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
