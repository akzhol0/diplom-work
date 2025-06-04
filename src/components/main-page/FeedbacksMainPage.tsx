"use client";

import React, { useContext } from "react";
import Link from "next/link";
import AllFeedbacks from "@/components/feedback/AllFeedbacks";
import { contextData } from "@/components/context/context";

const FeedbacksMainPage = () => {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="flex flex-col gap-4 mt-[20px]">
      <p className="ps-2 text-[40px] lg:text-[50px] font-bold">
        {mainLanguage.rest.feedsUser}
      </p>
      <p className="ps-2 max-w-[500px] lg:text-lg">
        {mainLanguage.leftOut.feedSmall}
      </p>
      <div className="flex flex-col">
        <AllFeedbacks from={"mainPage"} />
        <Link href="/feedback">
          <p className="text-lg p-2 text-red-600 cursor-pointer">
            {mainLanguage.leftOut.goSee}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FeedbacksMainPage;
