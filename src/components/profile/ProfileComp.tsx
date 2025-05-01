"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import Image from "next/image";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import Link from "next/link";
import UserFeedbacks from "@/components/feedback/UserFeedbacks";
import AsTwiceModal from "@/components/profile/AsTwiceModal";
import FriendsModal from "../users/FriendsModal";

function ProfileComp() {
  const { userInfo, mainLanguage, auth } = useContext(contextData);
  const [modalTwice, setModalTwice] = useState(false);
  const [friendsModal, setFriendsModal] = useState(false);

  return auth ? (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 items-center ">
        <Image
          src={
            userInfo.gender === "Женщина"
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
          <div className="flex">
            <div
              onClick={() => setFriendsModal(!friendsModal)}
              className="w-auto border-white border-b hover:border-b hover:border-black cursor-pointer"
            >
              Друзья: {userInfo.friends.length}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 my-2">
            <Link href="/edit">
              <MyPrimaryButton className="font-semibold h-[40px] whitespace-nowrap">
                {mainLanguage.edit.btn}
              </MyPrimaryButton>
            </Link>
            <span
              onClick={() => {
                setModalTwice(true);
              }}
            >
              <MyButtonDanger className="font-semibold h-[40px] whitespace-nowrap">
                {mainLanguage.profile.btn}
              </MyButtonDanger>
            </span>
            {modalTwice && <AsTwiceModal setModalTwice={setModalTwice} />}
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
          {mainLanguage.rest.feedsUser} {userInfo.userName}
        </div>
        <UserFeedbacks userToken={userInfo.userId} />
      </div>
      {friendsModal && (
        <FriendsModal user={userInfo} setFriendsModal={setFriendsModal} />
      )}
    </div>
  ) : (
    <LoadingUI />
  );
}

export default ProfileComp;
