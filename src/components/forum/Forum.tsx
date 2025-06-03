"use client";

import React, { useContext, useEffect, useState } from "react";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import ForumItem from "@/components/forum/ForumItem";
import { SingleForumItemProps } from "@/components/types/types";
import ForumInput from "@/components/forum/ForumInput";
import GoUpButton from "@/components/UI/my-buttons/go-up-button/GoUpButton";
import { contextData } from "@/components/context/context";

const Forum = () => {
  const { isVisible, setIsVisible } = useContext(contextData);
  const [allForumItems, setForumItems] = useState<any>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setIsVisible(window.scrollY > 1000),
    );
  }, []);

  useEffect(() => {
    allForumItems.length === 0 && getAllForumItems();
  }, []);

  const getAllForumItems = async () => {
    setForumItems([]);
    const q = query(collection(db, "forum"), orderBy("count", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setForumItems((prev: any) => [...prev, { ...doc.data(), id: doc.id }]);
    });
  };

  return (
    <>
      <div>
        <p className="text-center font-middle text-2xl">Форум</p>
        <div className="flex justify-center">
          <ForumInput
            getAllForumItems={getAllForumItems}
            setError={setError}
            error={error}
            allForumItems={allForumItems}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 my-6">
        {allForumItems.length > 0 ? (
          allForumItems.map((item: SingleForumItemProps, index: number) => (
            <ForumItem
              getAllForumItems={getAllForumItems}
              setError={setError}
              key={index}
              item={item}
            />
          ))
        ) : (
          <LoadingUi />
        )}
      </div>
      {isVisible && <GoUpButton />}
    </>
  );
};

export default Forum;
