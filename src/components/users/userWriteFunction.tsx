import React, { useState } from "react";
import { UserInfoTypes } from "@/components/types/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";

type UserWriteFunctionProps = {
  setWriteModal: (arg0: boolean) => void;
  receivingUser: UserInfoTypes;
  sendingUser: UserInfoTypes;
  didTheyMessaged: boolean;
  twoUserMessages: any;
  setTwoUserMessages: (arg0: any) => void;
  id: string;
};

const UserWriteFunction = ({
  setWriteModal,
  receivingUser,
  sendingUser,
  didTheyMessaged,
  twoUserMessages,
  id,
  setTwoUserMessages,
}: UserWriteFunctionProps) => {
  const [userInputMessage, setUserInputMessage] = useState("");

  const handleSubmitSendMessage = async () => {
    if (userInputMessage === "") return;
    setUserInputMessage("");

    const randomField = twoUserMessages.length + 1;
    const data = {
      [randomField]: {
        sendingUserId: sendingUser.userId,
        message: userInputMessage,
      },
    };

    setTwoUserMessages((prev: any) => [
      ...prev,
      { sendingUserId: sendingUser.userId, message: userInputMessage },
    ]);

    if (didTheyMessaged) {
      await setDoc(doc(db, "userMessages", `${id}`), data, { merge: true });
    } else {
      await setDoc(
        doc(
          db,
          "userMessages",
          `${receivingUser.userId}_${sendingUser.userId}`,
        ),
        data,
        { merge: true },
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="flex flex-col bg-white p-4 rounded-3xl shadow-xl w-[600px] h-[600px] text-center">
        <div className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-xl">
          <h2 className="text-md font-semibold">{receivingUser.userName}</h2>
        </div>
        <div className="flex flex-col h-[500px] overflow-y-auto gap-2 my-4">
          {twoUserMessages.length !== 0 ? (
            twoUserMessages
              .sort((a: any, b: any) => {
                a - b;
              })
              .map((item: any, index: number) => (
                <div
                  className={`p-2 bg-gray-100 rounded-lg ${item.sendingUserId !== sendingUser.userId ? "self-start" : "self-end"} `}
                  key={index}
                >
                  <div>
                    <div>
                      {item.sendingUserId === sendingUser.userId ? (
                        <p>{sendingUser.userName}:</p>
                      ) : (
                        <p>{receivingUser.userName}:</p>
                      )}
                    </div>
                    <p>{item.message}</p>
                  </div>
                </div>
              ))
          ) : (
            <div className="h-full text-lg flex justify-center items-center">
              <p>Пусто</p>
            </div>
          )}
        </div>
        <div className="bg-white flex items-center">
          <div onClick={() => setWriteModal(false)}>
            <button className="me-2 bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-800 transition">
              Назад
            </button>
          </div>
          <input
            type="text"
            placeholder="Написать..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userInputMessage}
            onChange={(e) => setUserInputMessage(e.target.value)}
          />
          <button
            onClick={() => handleSubmitSendMessage()}
            className="ms-2 bg-blue-500 text-white px-3 py-2 rounded-xl hover:bg-blue-800 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWriteFunction;
