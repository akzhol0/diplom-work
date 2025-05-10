import React, { useContext, useEffect } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import FeedbackItself from "@/components/feedback/FeedbackItself";
import { contextData } from "@/components/context/context";
import { FeedbacksTypes } from "@/components/types/types";
import GoUpButton from "@/components/UI/my-buttons/go-up-button/GoUpButton";

const AllFeedbacks = () => {
  const { mainLanguage, feedbacks, loadedFeedbacks, isVisible, setIsVisible } =
    useContext(contextData);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setIsVisible(window.scrollY > 1000),
    );
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <p className="text-center text-3xl">
        {mainLanguage.feedback.allFeedbacks}
      </p>
      <div className="w-full flex justify-center">
        {loadedFeedbacks ? (
          <div className="w-full">
            {feedbacks.map((feedback: FeedbacksTypes, index: number) => (
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
