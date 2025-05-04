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
                src={singleUserModal.image}
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
