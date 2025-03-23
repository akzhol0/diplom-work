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
import { FeedbacksTypes } from "@/components/types/types";

type FeedbackOptionsProps = {
  feedback: FeedbacksTypes;
  setPostLikesCount: (arg0: any) => void;
};

const FeedbackOptions = ({
  feedback,
  setPostLikesCount,
}: FeedbackOptionsProps) => {
  const { userInfo, mainLanguage, setFeedbacks, feedbacks, auth } =
    useContext(contextData);
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

    setFeedbacks(
      feedbacks.filter((item: any) => item.header !== feedback.header),
    );
  };

  return (
    <div
      onMouseEnter={() => setModalVisible(true)}
      onMouseLeave={() => setModalVisible(false)}
      className={`relative w-[30px] h-[30px] ms-2 rounded-lg flex items-center gap-1 cursor-pointer duration-200 
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
      {auth && (
        <div
          className={`absolute flex flex-col items-center top-[30px] right-0 w-[150px] min-h-[20px] 
        duration-200 bg-[#131313] rounded-lg text-white overflow-hidden 
        ${modalVisible ? "block" : "hidden"}`}
        >
          {userInfo?.userId === feedback.feedbackUserInfo.userId && (
            <div
              onClick={() => handleDeleteButton()}
              className="w-full hover:bg-gray-600 text-center"
            >
              {mainLanguage.feedback.delete}
            </div>
          )}
          {didUserLiked ? (
            <div
              onClick={() => handleLikeFunction("dislike")}
              className="w-full hover:bg-gray-600 text-center"
            >
              {mainLanguage.feedback.dislike}
            </div>
          ) : (
            <div
              onClick={() => handleLikeFunction("like")}
              className="w-full hover:bg-gray-600 text-center"
            >
              {mainLanguage.feedback.like}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackOptions;
