import React, { useContext, useState } from "react";
import { contextData } from "@/components/context/context";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";

type FeedbackOptionsProps = {
  feedback: any;
};

const FeedbackOptions = ({ feedback }: FeedbackOptionsProps) => {
  const { userInfo, mainLanguage, setFeedbacks, feedbacks } =
    useContext(contextData);
  const [modalVisible, setModalVisible] = useState(false);

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
        className={`absolute flex flex-col items-center top-[30px] right-0 w-[150px] min-h-[20px] 
        duration-200 bg-[#131313] rounded-lg text-white overflow-hidden 
        ${modalVisible ? "block" : "hidden"}`}
      >
        {userInfo.userId === feedback.feedbackUserInfo.userId && (
          <div
            onClick={() => handleDeleteButton()}
            className="w-full hover:bg-gray-600 text-center"
          >
            {mainLanguage.feedback.delete}
          </div>
        )}
        <div className="w-full hover:bg-gray-600 text-center">
          {mainLanguage.feedback.like}
        </div>
        <div className="w-full hover:bg-gray-600 text-center">
          {mainLanguage.feedback.dislike}
        </div>
      </div>
    </div>
  );
};

export default FeedbackOptions;
