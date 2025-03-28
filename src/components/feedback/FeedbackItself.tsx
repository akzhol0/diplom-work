import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import FeedbackOptions from "@/components/feedback/feedbackOptions";
import Link from "next/link";
import { FeedbacksTypes, UserInfoTypes } from "@/components/types/types";
import { contextData } from "@/components/context/context";

type FeedbackItselfProps = {
  feedback: FeedbacksTypes;
};

const FeedbackItself = ({ feedback }: FeedbackItselfProps) => {
  const { users } = useContext(contextData);
  const [user, setUser] = useState<UserInfoTypes>();

  const getOneUser = () => {
    users.map((item) => {
      if (feedback.feedbackId === item.userId) {
        setUser(item);
      }
    });
  };

  useEffect(() => {
    users.length !== 0 && getOneUser();
  }, [users]);

  const [postLikesCount, setPostLikesCount] = useState(
    feedback.likedUsers.length,
  );

  return (
    <div className="flex flex-col min-h-[150px] bg-[#f1f1f1] rounded-lg my-4 p-5">
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="w-[50px] h-[50px] rounded-[50%] border overflow-hidden">
            <Image
              src={
                user?.image.includes("https") || user?.image.includes("http")
                  ? user?.image
                  : "/images/user-img.png"
              }
              alt="pfp"
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center text-sm justify-center ps-2">
            <div>
              <Link href={`/users/${user?.userId}`}>
                <p className="max-w-[120px] overflow-hidden hover:underline cursor-pointer whitespace-nowrap">
                  {user?.userName}
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
                    className={`text-xl md:text-2xl ps-1 cursor-default ${
                      feedback.rating >= index + 1
                        ? "text-red-600"
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
        <FeedbackOptions
          setPostLikesCount={setPostLikesCount}
          feedback={feedback}
        />
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-md sm:text-xl font-semibold">{feedback.header}</p>
        <p className="text-sm sm:text-base mt-2">{feedback.body}</p>
      </div>
      <div className="flex border-t border-red-600 mt-2 py-2">
        <div className="flex items-center gap-2">
          <Image src="/images/like.png" alt="like-png" width={25} height={25} />
          {postLikesCount}
        </div>
      </div>
    </div>
  );
};

export default FeedbackItself;
