import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/components/firebase/config";
import { FeedbacksTypes, UserInfoTypes } from "@/components/types/types";
import Link from "next/link";

type FeedbackOptionsProps = {
  feedback: FeedbacksTypes;
  setPostLikesCount: (arg0: any) => void;
  user: UserInfoTypes | undefined;
};

const FeedbackOptions = ({
  feedback,
  setPostLikesCount,
  user,
}: FeedbackOptionsProps) => {
  const {
    userInfo,
    mainLanguage,
    setFeedbacks,
    feedbacks,
    auth,
    getFeedbacks,
  } = useContext(contextData);
  const [modalVisible, setModalVisible] = useState(false);
  const [didUserLiked, setDidUserLiked] = useState(false);

  useEffect(() => {
    checkIfUserLiked();
  }, []);

  const checkIfUserLiked = () => {
    if (!auth) {
      return;
    }

    feedback.likedUsers.map((user: any) => {
      if (user.log === userInfo.userId) {
        setDidUserLiked(true);
      }
    });
  };

  const handleLikeFunction = async (action: "like" | "dislike") => {
    const docRef = doc(db, "feedbacks", `${feedback.id}`);
    const updateAction = action === "like" ? arrayUnion : arrayRemove;
    console.log(feedback);

    setDidUserLiked(!didUserLiked);
    setModalVisible(false);

    setPostLikesCount(
      (postLikesCount: any) => postLikesCount + (action === "like" ? 1 : -1),
    );

    const log = userInfo.userId;
    await updateDoc(docRef, {
      likedUsers: updateAction({
        log,
      }),
    });
  };

  const handleDeleteButton = async () => {
    await deleteDoc(doc(db, "feedbacks", `${feedback.id}`));
    setFeedbacks(feedbacks.filter((item: any) => item !== feedback));
  };

  return (
    <div
      onMouseEnter={() => setModalVisible(true)}
      onMouseLeave={() => setModalVisible(false)}
      className={`relative w-[30px] h-[30px] ms-2 rounded-lg flex justify-center items-center gap-1 cursor-pointer duration-200 
      ${modalVisible && "bg-white"}`}
    >
      {[...Array(3)].map((_, index) => {
        return (
          <span
            key={index}
            className="w-[3px] h-[3px] rounded-lg] bg-black"
          ></span>
        );
      })}

      <div
        className={`absolute top-[30px] right-0 flex flex-col w-[150px] bg-[#131313] rounded-xl text-white
        ${modalVisible ? "block" : "hidden"}`}
      >
        <Link
          className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
          href={`/users/${user?.userId}`}
        >
          <div>{mainLanguage.rest.user}</div>
        </Link>
        {userInfo?.userId === feedback.author.userId && (
          <div
            onClick={() => handleDeleteButton()}
            className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
          >
            {mainLanguage.feedback.delete}
          </div>
        )}
        {auth &&
          (didUserLiked ? (
            <div
              onClick={() => handleLikeFunction("dislike")}
              className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
            >
              {mainLanguage.feedback.dislike}
            </div>
          ) : (
            <div
              onClick={() => handleLikeFunction("like")}
              className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
            >
              {mainLanguage.feedback.like}
            </div>
          ))}
        <div
          onClick={() => setModalVisible(false)}
          className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
        >
          <div>{mainLanguage.rest.copy}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackOptions;
