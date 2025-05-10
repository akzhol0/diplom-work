"use client";

import React, { useContext, useState } from "react";
import OpenModal from "@/components/usersModal/OpenModal";
import { contextData } from "@/components/context/context";
import { UserInfoTypes } from "@/components/types/types";
import Image from "next/image";
import Link from "next/link";

const UsersListModal = () => {
  const { users } = useContext(contextData);
  const [isUserListModal, setIsUserListModal] = useState(false);

  return (
    <div>
      <OpenModal setIsUserListModal={setIsUserListModal} />
      {isUserListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
            <p className="text-lg text-center mb-2">Все пользователи:</p>
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
              {users.map((item: UserInfoTypes, index: number) => (
                <div key={index} className="flex items-center ">
                  <div className="w-[50px] h-[50px] rounded-[50%] border overflow-hidden">
                    <Image src={item.image} alt="pfp" width={60} height={60} />
                  </div>
                  <div className="ps-2 text-sm">
                    <div className="flex flex-col">
                      <Link href={`/users/${item.userId}`}>
                        <p className="flex text-start overflow-hidden hover:underline cursor-pointer whitespace-nowrap">
                          {item.userName}
                        </p>
                      </Link>
                      <p className="text-start">{item.birthdate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setIsUserListModal(false);
                }}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersListModal;
