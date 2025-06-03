import React, { useContext, useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import { contextData } from "@/components/context/context";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import { SingleForumItemProps } from "@/components/types/types";

type ForumInputProps = {
  error: string;
  setError: (arg0: string) => void;
  getAllForumItems: () => void;
  allForumItems: SingleForumItemProps[];
};

const ForumInput = ({
  error,
  setError,
  getAllForumItems,
  allForumItems,
}: ForumInputProps) => {
  const { userInfo, isAuth, mainLanguage } = useContext(contextData);

  const [header, setHeader] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuth) {
      setError("Надо зарегестрироваться, чтобы создать дискуссию в форуме!");
      return;
    }

    if (header === "" || desc === "") {
      setError(mainLanguage.rest.pleaseSignAll);
      return;
    }

    setHeader("");
    setDesc("");

    const forumItemObj = {
      header: header,
      description: desc,
      authorId: userInfo.userId,
      comments: [],
      createdAt: Date.now(),
      count: allForumItems.length + 1,
    };

    const forumRef = doc(collection(db, "forum"));
    await setDoc(forumRef, forumItemObj);
    getAllForumItems();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full md:w-3/5 lg:w-2/5 flex flex-col gap-4 items-center`}
    >
      <input
        placeholder={mainLanguage.feedback.header}
        className="w-full h-[60px] border-b border-1 focus:outline-0 rounded-lg ps-2"
        type="text"
        id="header"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      />
      <textarea
        placeholder={mainLanguage.feedback.body}
        className="w-full h-[100px] border-b focus:outline-0 ps-2 rounded-lg"
        id="message"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <MyPrimaryButton type="submit" className="w-full font-semibold">
        {mainLanguage.leftOut.add}
      </MyPrimaryButton>
      <div className="flex justify-center">
        <p className="max-w-[300px] text-red-600 text-center">{error}</p>
      </div>
    </form>
  );
};

export default ForumInput;
