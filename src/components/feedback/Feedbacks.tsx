"use client";

import React, { useContext, useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import { contextData } from "@/components/context/context";
import AllFeedbacks from "@/components/feedback/AllFeedbacks";
import StarRating from "@/components/feedback/StarRating";

const Feedbacks = () => {
  const { mainLanguage } = useContext(contextData);
  const [headerInput, setHeaderInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const feedbackObj = {
      header: headerInput,
      body: bodyInput,
      rating: ratingInput,
    };

    console.log(feedbackObj);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full md:w-[500px] flex justify-between items-center gap-4">
            <input
              className="h-[60px] border-b border-1 focus:outline-0 rounded-lg ps-2"
              placeholder="Заголовок"
              type="text"
              id="header"
              onChange={(e) => setHeaderInput(e.target.value)}
            />
            <div className="flex items-center">
              <p className="me-4">Оценка: </p>
              <StarRating setRatingInput={setRatingInput} />
            </div>
          </div>
          <textarea
            className="w-full h-[100px] border-b focus:outline-0 ps-2 rounded-lg"
            placeholder="Описания"
            id="message"
            onChange={(e) => setBodyInput(e.target.value)}
          ></textarea>
          <MyPrimaryButton type="submit" className="font-semibold">
            {mainLanguage.feedback.btn}
          </MyPrimaryButton>
        </form>
      </div>
      <AllFeedbacks />
    </div>
  );
};

export default Feedbacks;
