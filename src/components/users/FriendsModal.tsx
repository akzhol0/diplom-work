import React, { useContext } from "react";
import { UserInfoTypes } from "@/components/types/types";
import SingleFriendModal from "@/components/users/SingleFriendModal";
import { contextData } from "@/components/context/context";

type FriendsModalProps = {
  setFriendsModal: (arg0: boolean) => void;
  user: UserInfoTypes;
};

const FriendsModal = ({ setFriendsModal, user }: FriendsModalProps) => {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
        <p className={"text-lg"}>{mainLanguage.leftOut.friends}:</p>
        <div>
          {user.friends.length > 0 ? (
            <div className="my-4 flex flex-col gap-2 max-h-[400px] overflow-y-scroll">
              {user.friends.map((friend: any, index: number) => (
                <SingleFriendModal friend={friend.log} key={index} />
              ))}
            </div>
          ) : (
            <div className="py-4">Пусто</div>
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setFriendsModal(false);
            }}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            {mainLanguage.edit.btn2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;
