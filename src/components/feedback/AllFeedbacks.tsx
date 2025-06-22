import React, { useContext, useEffect } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import FeedbackItself from "@/components/feedback/FeedbackItself";
import { contextData } from "@/components/context/context";
import { FeedbacksTypes } from "@/components/types/types";
import GoUpButton from "@/components/UI/my-buttons/go-up-button/GoUpButton";

type AllFeedbacksProps = {
  from?: string;
};

const AllFeedbacks = ({ from }: AllFeedbacksProps) => {
  const { feedbacks, loadedFeedbacks, isVisible, setIsVisible } =
    useContext(contextData);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setIsVisible(window.scrollY > 1000),
    );
  }, []);

  const getFilterId = () => {
    if (from === "mainPage") {
      return feedbacks.length - 2;
    }
    return 0;
  };

  const filterId = getFilterId();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex justify-center">
        {loadedFeedbacks ? (
          <div className="w-full">
            {feedbacks
              .filter((feedback: FeedbacksTypes) => feedback.postId > filterId)
              .map((feedback: FeedbacksTypes, index: number) => (
                <FeedbackItself feedback={feedback} key={index} />
              ))}
          </div>
        ) : (
          <LoadingUI />
        )}
        {isVisible && <GoUpButton />}
      </div>
    </div>
  );
};

export default AllFeedbacks;
