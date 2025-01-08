import React, { useContext } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import FeedbackItself from "@/components/feedback/FeedbackItself";
import { contextData } from "@/components/context/context";
import { FeedbacksTypes } from "@/components/types/types";

const AllFeedbacks = () => {
  const { mainLanguage, feedbacks, loadedFeedbacks } = useContext(contextData);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <p className="text-center text-3xl">
        {mainLanguage.feedback.allFeedbacks}
      </p>
      <div className="w-full md:w-[80%] flex justify-center">
        {loadedFeedbacks ? (
          <div className="w-full">
            {feedbacks.map((feedback: FeedbacksTypes, index: number) => (
              <FeedbackItself feedback={feedback} key={index} />
            ))}
          </div>
        ) : (
          <LoadingUI />
        )}
      </div>
    </div>
  );
};

export default AllFeedbacks;
