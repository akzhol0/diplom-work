import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import FeedbackItself from "@/components/feedback/FeedbackItself";
import { FeedbacksTypes, UserInfoTypes } from "@/components/types/types";

type UserFeedbacksProps = {
  userToken: string;
  user: UserInfoTypes;
};

const UserFeedbacks = ({ userToken, user }: UserFeedbacksProps) => {
  const { feedbacks, loadedFeedbacks, mainLanguage } = useContext(contextData);

  function filterFeedbacksFunction() {
    return feedbacks.filter(
      (item: FeedbacksTypes) => item.authorId === userToken,
    );
  }

  const filteredFeedbacks = filterFeedbacksFunction();

  return loadedFeedbacks ? (
    filteredFeedbacks.length > 0 ? (
      filteredFeedbacks.map((item: any, index: number) => (
        <FeedbackItself key={index} feedback={item} />
      ))
    ) : (
      <p className="text-center mt-3">
        {user.userName}, {mainLanguage.rest.noFeed}
      </p>
    )
  ) : (
    <LoadingUI />
  );
};

export default UserFeedbacks;
