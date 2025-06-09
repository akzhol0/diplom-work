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
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/components/firebase/config";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import ForumItem from "@/components/forum/ForumItem";
import UserMessagesComp from "@/components/profile/UserMessagesComp";

function ProfileComp() {
  const { userInfo, mainLanguage, isAuth } = useContext(contextData);
  const [modalTwice, setModalTwice] = useState(false);
  const [friendsModal, setFriendsModal] = useState(false);
  const [userForumTab, setUserForumTab] = useState<any>(null);
  const [error, setError] = useState("");
  auth.languageCode = "ru";

  const getAllForumItems = async () => {
    const q = query(collection(db, "forum"), orderBy("count", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().authorId === userInfo.userId) {
        setUserForumTab(doc.data());
      }
    });
  };

  useEffect(() => {
    userInfo && checkIfUserVerified();
    userInfo && getAllForumItems();
  }, [userInfo]);

  const checkIfUserVerified = () => {
    signInWithEmailAndPassword(auth, userInfo.userLogin, userInfo.userPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;

        if (user.emailVerified) {
          updateFirebaseData(true);
        } else {
          updateFirebaseData(false);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const updateFirebaseData = async (move: boolean) => {
    userInfo.verified = move;

    const newData = {
      ...userInfo,
      verified: move,
    };

    const referral = doc(db, "users", `${userInfo.userId}`);
    await updateDoc(referral, {
      ...newData,
    });
  };

  const resendVerifyLetter = async () => {
    const user = auth.currentUser;

    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      alert("Письмо для верификаций отправлено!");
    }
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      year: "numeric",
      month: "long",
    };

    return date.toLocaleString("ru-RU", options);
  };

  return isAuth ? (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 items-center ">
        <Image
          src={userInfo.image}
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
          <div className="flex gap-2">
            <p>
              {mainLanguage.profile.role}:{" "}
              {userInfo.role === "user"
                ? mainLanguage.leftOut.user
                : mainLanguage.leftOut.admin}
            </p>
            {/*<div>*/}
            {/*  {userInfo.role === "admin" && (*/}
            {/*    <Link href="/admin">*/}
            {/*      <p className="underline">{mainLanguage.leftOut.adminPage}</p>*/}
            {/*    </Link>*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>
          <p>
            {mainLanguage.leftOut.birthdayDate}:{" "}
            {formatTime(userInfo.birthdate)}
          </p>
          <div className="flex">
            <div
              onClick={() => setFriendsModal(!friendsModal)}
              className="w-auto border-white border-b hover:border-b hover:border-black cursor-pointer"
            >
              {mainLanguage.leftOut.friends}: {userInfo.friends.length}
            </div>
          </div>
          <div className="">
            <UserMessagesComp />
          </div>
          <div className="flex flex-col">
            <p>
              {mainLanguage.leftOut.verifyPosition}{" "}
              {userInfo.verified
                ? `${mainLanguage.leftOut.yes}`
                : `${mainLanguage.leftOut.no}`}
            </p>
            {!userInfo.verified && (
              <>
                <div
                  className="underline cursor-pointer"
                  onClick={() => resendVerifyLetter()}
                >
                  {mainLanguage.leftOut.verifySent}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col xl:flex-row gap-2 my-2">
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
            <Link href="/forum">
              <MyPrimaryButton className="font-semibold h-[40px] whitespace-nowrap">
                {mainLanguage.rest.goForumLink}
              </MyPrimaryButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-2xl border-t border-red-600 mt-6 pt-4 text-center">
          {mainLanguage.rest.feedsUser} {userInfo.userName}
        </div>
        <UserFeedbacks user={userInfo} userToken={userInfo.userId} />
        {userForumTab && (
          <div>
            <p className="text-2xl py-4 text-center">
              {mainLanguage.leftOut.forum} {userInfo.userName}
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
        <FriendsModal user={userInfo} setFriendsModal={setFriendsModal} />
      )}
    </div>
  ) : (
    <LoadingUI />
  );
}

export default ProfileComp;
