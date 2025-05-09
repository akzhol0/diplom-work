import React, { useContext, useState } from "react";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { contextData } from "@/components/context/context";
import { SingleForumItemProps } from "@/components/types/types";
import { db } from "@/components/firebase/config";

type ForumCommInputProps = {
  setError: (arg: string) => void;
  item: SingleForumItemProps;
  setPostComments: (arg: any) => void;
};

const ForumCommInput = ({
  setError,
  item,
  setPostComments,
}: ForumCommInputProps) => {
  const { isAuth, userInfo } = useContext(contextData);

  const [header, setHeader] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuth) {
      setError("Надо зарегестрироваться, чтобы создать дискуссию в форуме!");
      return;
    }

    if (header === "" || desc === "") {
      setError("Пажалуйста заполните все поля!");
      return;
    }

    setHeader("");
    setDesc("");

    const forumItemObjState = {
      header: header,
      description: desc,
      authorId: userInfo.userId,
      comments: [],
      createdAt: "",
    };

    addFirebaseDocument();

    setPostComments((prev: any) => [...prev, forumItemObjState]);
  };

  const addFirebaseDocument = async () => {
    const docRef = doc(db, "forum", `${item.id}`);

    const forumItemObjFirebase = {
      header: header,
      description: desc,
      authorId: userInfo.userId,
      comments: [],
      createdAt: "",
    };

    await updateDoc(docRef, {
      comments: arrayUnion(forumItemObjFirebase),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[80%] md:w-[600px] flex flex-col md:flex-row items-center justify-end gap-2 ms-[40px] py-2"
    >
      <input
        placeholder="Заголовок"
        className="w-full h-[40px] border-b border-1 focus:outline-0 rounded-lg ps-2"
        type="text"
        id="header"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      />
      <input
        placeholder="Описание"
        className="w-full h-[40px] border-b border-1 focus:outline-0 rounded-lg ps-2"
        type="text"
        id="header"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <MyPrimaryButton type={"submit"} className="px-2 h-[40px]">
        Написать
      </MyPrimaryButton>
    </form>
  );
};

export default ForumCommInput;
