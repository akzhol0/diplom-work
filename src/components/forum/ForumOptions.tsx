import React, { useContext } from "react";
import Link from "next/link";
import { SingleForumItemProps, UserInfoTypes } from "@/components/types/types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import { contextData } from "@/components/context/context";

type ForumItemProps = {
  forumOptions: boolean;
  type: any;
  user: UserInfoTypes;
  setCommentsLoading: (arg0: boolean) => void;
  setForumOptions: (arg0: boolean) => void;
  setIsCommentsVisible: (arg0: boolean) => void;
  isCommentsVisible: boolean;
  item: SingleForumItemProps;
  getAllForumItems: () => void;
};

const ForumOptions = ({
  forumOptions,
  setForumOptions,
  type,
  user,
  setCommentsLoading,
  setIsCommentsVisible,
  isCommentsVisible,
  getAllForumItems,
  item,
}: ForumItemProps) => {
  const { userInfo, isAuth } = useContext(contextData);

  const handleDeleteButton = async () => {
    await deleteDoc(doc(db, "forum", `${item.id}`));
    getAllForumItems();
  };

  return (
    <div
      onMouseEnter={() => setForumOptions(true)}
      onMouseLeave={() => setForumOptions(false)}
      className={`w-[30px] h-[30px] bg-gray-100 relative flex justify-center items-center rounded-lg cursor-pointer gap-1`}
    >
      {[...Array(3)].map((_, index) => {
        return (
          <span
            key={index}
            className="w-[3px] h-[3px] rounded-lg] bg-black"
          ></span>
        );
      })}
      {forumOptions && (
        <div
          className={`absolute top-[30px] right-0 w-[150px] min-h-[30px] bg-[#131313] rounded-xl text-white`}
        >
          <Link
            className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
            href={`/users/${user?.userId}`}
          >
            <div>Пользователь</div>
          </Link>
          <div
            onClick={() => setForumOptions(false)}
            className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
          >
            <div>Скопировать</div>
          </div>
          {type !== "low" && isAuth && (
            <>
              {user.userId === userInfo.userId && (
                <div
                  onClick={() => handleDeleteButton()}
                  className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
                >
                  <div>Удалить</div>
                </div>
              )}
            </>
          )}
          {type !== "low" && (
            <div
              onClick={() => {
                setForumOptions(false);
                setCommentsLoading(true);
                setTimeout(() => {
                  setCommentsLoading(false);
                  setIsCommentsVisible(!isCommentsVisible);
                }, 500);
              }}
              className="w-full h-[30px] flex items-center rounded-xl hover:bg-gray-700 justify-center"
            >
              <div>Комментарий</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumOptions;
