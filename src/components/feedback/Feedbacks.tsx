"use client";

import React, { useContext, useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import { contextData } from "@/components/context/context";
import AllFeedbacks from "@/components/feedback/AllFeedbacks";
import StarRating from "@/components/feedback/StarRating";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import { FeedbacksTypes } from "@/components/types/types";

const Feedbacks = () => {
  const {
    mainLanguage,
    userInfo,
    setFeedbacks,
    isAuth,
    getFeedbacks,
    feedbacks,
  } = useContext(contextData);

  const [headerInput, setHeaderInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuth) {
      setError(mainLanguage.rest.feedMessage);
      return;
    }

    if (headerInput === "" || bodyInput === "") {
      setError(mainLanguage.rest.pleaseSignAll);
      return;
    }

    setHeaderInput("");
    setBodyInput("");
    setRatingInput(0);

    const feedbacksRef = doc(collection(db, "feedbacks"));

    const feedbackObj = {
      header: headerInput,
      body: bodyInput,
      rating: ratingInput,
      authorId: userInfo.userId,
      date: Date.now(),
      likedUsers: [],
      postId: feedbacks.length + 1,
    };

    setFeedbacks((prev: FeedbacksTypes[]) => [feedbackObj, ...prev]);
    await setDoc(feedbacksRef, feedbackObj);
    getFeedbacks();
  };

  return (
    <div className="flex flex-col">
      <p className="text-center text-2xl mb-2">
        {mainLanguage.feedback.allFeedbacks}
      </p>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="min-w-[350px] flex flex-col gap-4"
        >
          <div className="w-full sm:w-[500px] flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              className="w-full h-[60px] border-b border-1 focus:outline-0 rounded-lg ps-2"
              placeholder={mainLanguage.feedback.header}
              type="text"
              id="header"
              value={headerInput}
              onChange={(e) => setHeaderInput(e.target.value)}
            />
            <div className="flex items-center">
              <p className="me-4">{mainLanguage.feedback.rating}: </p>
              <StarRating
                ratingInput={ratingInput}
                setRatingInput={setRatingInput}
              />
            </div>
          </div>
          <textarea
            className="w-full h-[100px] border-b focus:outline-0 ps-2 rounded-lg"
            placeholder={mainLanguage.feedback.body}
            id="message"
            value={bodyInput}
            onChange={(e) => setBodyInput(e.target.value)}
          ></textarea>
          <MyPrimaryButton type="submit" className="font-semibold">
            {mainLanguage.feedback.btn}
          </MyPrimaryButton>
          <div className="flex justify-center">
            <p className="max-w-[300px] text-red-600 text-center">{error}</p>
          </div>
        </form>
      </div>
      <AllFeedbacks />
    </div>
  );
};

export default Feedbacks;
