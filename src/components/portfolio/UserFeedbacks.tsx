import React, { useContext, useState } from "react";
import { contextData } from "@/components/context/context";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import FeedbackItself from "@/components/feedback/FeedbackItself";

type UserFeedbacksProps = {
  userIdProp: string;
};

const UserFeedbacks = ({ userIdProp }: UserFeedbacksProps) => {
  const { feedbacks, loadedFeedbacks, userInfo } = useContext(contextData);

  function filterFeedbacksFunction() {
    return feedbacks.filter(
      (item: any) => item.feedbackUserInfo.userId === userIdProp,
    );
  }

  const filteredFeedbacks = filterFeedbacksFunction();

  return loadedFeedbacks ? (
    filteredFeedbacks.length > 0 ? (
      filteredFeedbacks.map((item: any, index: number) => (
        <FeedbackItself key={index} feedback={item} />
      ))
    ) : (
      <p className="text-center mt-3">Вы пока не написали ни одного отзыва!</p>
    )
  ) : (
    <LoadingUI />
  );
};

export default UserFeedbacks;
