import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import { SingleForumItemProps, UserInfoTypes } from "@/components/types/types";
import Image from "next/image";
import Link from "next/link";
import Comm from "@/components/UI/icons/Comm";
import ForumCommInput from "@/components/forum/ForumCommInput";
import ForumOptions from "@/components/forum/ForumOptions";

type ForumItemProps = {
  item: SingleForumItemProps;
  type?: string;
  setError: (arg0: string) => void;
  getAllForumItems: () => void;
};

const ForumItem = ({
  item,
  type,
  setError,
  getAllForumItems,
}: ForumItemProps) => {
  const { users } = useContext(contextData);
  const [user, setUser] = useState<UserInfoTypes>();
  const [postComments, setPostComments] = useState<any>(item.comments);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [forumOptions, setForumOptions] = useState(false);
  const commentsLength = item.comments.length;

  useEffect(() => {
    !user && findUser();
  }, []);

  const findUser = async () => {
    users.map((userCallBack: UserInfoTypes) => {
      if (userCallBack.userId === item.authorId) {
        setUser(userCallBack);
      }
    });
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric", // added year here
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleString("ru-RU", options).replace(",", "");
  };

  return (
    <>
      {user && (
        <div className={`${type === "low" ? "min-w-[80%]" : "w-auto"}`}>
          <div
            className={`${type === "low" ? "min-w-[80%]" : "w-auto"} md:min-w-[600px] min-h-[150px] bg-gray-50 rounded-lg ${type === "low" ? "ms-[40px] md:ms-[100px] px-4" : "p-4"}`}
          >
            <div className="flex items-center justify-between">
              <div className="relative flex">
                {type === "low" && (
                  <div className="absolute left-[-100px] top-0">
                    {item.comments.length === commentsLength && (
                      <Image
                        width={142}
                        height={142}
                        alt="test"
                        src="/images/line-vert.png"
                      />
                    )}
                  </div>
                )}
                <div className="w-[50px] h-[50px] rounded-[50%] border overflow-hidden">
                  <Image src={user.image} alt="pfp" width={60} height={60} />
                </div>
                <div className="flex items-center text-sm justify-center ps-2">
                  <div>
                    <Link href={`/users/${user.userId}`}>
                      <p className="max-w-[150px] overflow-hidden hover:underline cursor-pointer whitespace-nowrap">
                        {user.userName}
                      </p>
                    </Link>
                    <p>{formatTime(item.createdAt)}</p>
                  </div>
                </div>
              </div>
              <ForumOptions
                setForumOptions={setForumOptions}
                forumOptions={forumOptions}
                type={type}
                user={user}
                setCommentsLoading={setCommentsLoading}
                isCommentsVisible={isCommentsVisible}
                setIsCommentsVisible={setIsCommentsVisible}
                item={item}
                getAllForumItems={getAllForumItems}
              />
            </div>
            <div
              className={`${type === "low" ? "py-2" : "py-4 border-b border-black"}`}
            >
              <div
                className={`font-semibold ${type === "low" ? "text-lg mb-0" : "text-xl mb-2"}`}
              >
                {item.header}
              </div>
              <div className={`${type === "low" ? "text-md" : "text-md"}`}>
                {item.description}
              </div>
            </div>
            {type !== "low" && (
              <div className="flex gap-2 pt-4">
                <div
                  onClick={() => {
                    setCommentsLoading(true);
                    setTimeout(() => {
                      setIsCommentsVisible(!isCommentsVisible);
                      setCommentsLoading(false);
                    }, 500);
                  }}
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <Comm /> {postComments.length}
                </div>
              </div>
            )}
          </div>
          {isCommentsVisible ? (
            <div className="flex flex-col items-end">
              {type !== "low" && (
                <div className="mt-2 flex flex-col gap-2">
                  {postComments.length !== 0 &&
                    postComments.map((item: any, index: number) => (
                      <ForumItem
                        setError={setError}
                        type={"low"}
                        key={index}
                        item={item}
                        getAllForumItems={getAllForumItems}
                      />
                    ))}
                </div>
              )}
              <ForumCommInput
                setPostComments={setPostComments}
                item={item}
                setError={setError}
              />
            </div>
          ) : (
            commentsLoading && <div className="ms-[100px] p-4">Загрузка...</div>
          )}
        </div>
      )}
    </>
  );
};

export default ForumItem;
