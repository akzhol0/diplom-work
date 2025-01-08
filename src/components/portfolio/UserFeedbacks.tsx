import React, { useContext, useState } from "react";
import { contextData } from "@/components/context/context";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import FeedbackItself from "@/components/feedback/FeedbackItself";
import { FeedbacksTypes } from "@/components/types/types";

type UserFeedbacksProps = {
  userToken: string;
};

const UserFeedbacks = ({ userToken }: UserFeedbacksProps) => {
  const { feedbacks, loadedFeedbacks } = useContext(contextData);

  function filterFeedbacksFunction() {
    return feedbacks.filter(
      (item: FeedbacksTypes) => item.feedbackUserInfo.userId === userToken,
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
