import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";
import { UserInfoTypes } from "@/components/types/types";
import Image from "next/image";
import Link from "next/link";

type SingleFriendModalProps = {
  friend: string;
};

const SingleFriendModal = ({ friend }: SingleFriendModalProps) => {
  const { users } = useContext(contextData);
  const [singleUserModal, setSingleUserModal] = useState<UserInfoTypes>();

  useEffect(() => {
    !singleUserModal && findSingleUser();
  }, []);

  const findSingleUser = () => {
    users.map((item: UserInfoTypes) => {
      if (item.userId === friend) {
        setSingleUserModal(item);
      }
    });
  };

  return (
    <div>
      {singleUserModal ? (
        <>
          <div className="flex">
            <div className="w-[50px] h-[50px] rounded-[50%] border overflow-hidden">
              <Image
                src={
                  singleUserModal.gender === "Женщина"
                    ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3o5Z3g3OHRlN210bzBocHhqdHV0MXBibHJqdjlndGh3NzI5dmY4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L9fiOLupBnbMiKbXdJ/giphy.gif"
                    : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3RocXA3bGEwZXpuZzh5b3Y3aDdjY3NvaTlkZTFoczY2OWxxMHF3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/F5YTPX0RukZe4KYTGS/giphy.gif"
                }
                alt="pfp"
                width={60}
                height={60}
              />
            </div>
            <div className="flex items-center text-sm justify-center ps-2">
              <div>
                <Link href={`/users/${singleUserModal.userId}`}>
                  <p className="max-w-[150px] overflow-hidden hover:underline cursor-pointer whitespace-nowrap">
                    {singleUserModal.userName}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default SingleFriendModal;
