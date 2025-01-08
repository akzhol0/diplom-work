import React from "react";
import Image from "next/image";
import FeedbackOptions from "@/components/feedback/feedbackOptions";
import Link from "next/link";
import { FeedbacksTypes } from "@/components/types/types";

type FeedbackItselfProps = {
  feedback: FeedbacksTypes;
};

const FeedbackItself = ({ feedback }: FeedbackItselfProps) => {
  return (
    <div className="flex flex-col min-h-[150px] bg-[#f1f1f1] rounded-lg my-4 p-5">
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="w-[50px] h-[50px] rounded-[50%] border overflow-hidden">
            <Image
              src={feedback.feedbackUserInfo.image}
              alt="pfp"
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center text-sm justify-center ps-2">
            <div>
              <Link href={`/users/${feedback.feedbackUserInfo.userId}`}>
                <p className="max-w-[120px] overflow-hidden hover:underline cursor-pointer whitespace-nowrap">
                  {feedback.feedbackUserInfo.userName}
                </p>
              </Link>
              <p className="max-w-[150px] md:max-w-[200px] max-h-[22px] overflow-hidden">
                {feedback.date}
              </p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    className={`text-xl md:text-2xl ps-1 ${
                      feedback.rating >= index + 1
                        ? "text-red-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <FeedbackOptions feedback={feedback} />
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-md sm:text-xl font-semibold">{feedback.header}</p>
        <p className="text-sm sm:text-base mt-2">{feedback.body}</p>
      </div>
    </div>
  );
};

export default FeedbackItself;
