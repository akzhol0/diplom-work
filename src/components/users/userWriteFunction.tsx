import React, { useEffect, useRef, useState } from "react";
import { UserInfoTypes } from "@/components/types/types";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import Imessage from "@/components/users/Imessage";

type UserWriteFunctionProps = {
  setWriteModal: (arg0: boolean) => void;
  receivingUser: UserInfoTypes;
  sendingUser: UserInfoTypes;
  docId: string;
};

const UserWriteFunction = ({
  setWriteModal,
  receivingUser,
  sendingUser,
  docId,
}: UserWriteFunctionProps) => {
  const [userInputMessage, setUserInputMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newDocId, setNewDocId] = useState(docId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    messages.length === 0 && getTwoUserMessages();
  }, []);

  const getTwoUserMessages = async () => {
    const docRef = doc(db, "userMessages", newDocId);

    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        const newMessages = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            id: key,
            message: value.message,
            senderId: value.sendingUserId,
            time: value.time,
          }),
        );

        setMessages(newMessages);
      } else {
        const createDoc = async () => {
          setNewDocId(`${sendingUser.userId}_${receivingUser.userId}`);
          await setDoc(
            doc(
              db,
              "userMessages",
              `${sendingUser.userId}_${receivingUser.userId}`,
            ),
            {},
          );
        };
        createDoc();
      }
    });
  };

  const handleSubmitSendMessage = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (userInputMessage === "") return;
    setUserInputMessage("");

    const data = {
      [messages.length + 1]: {
        sendingUserId: sendingUser.userId,
        message: userInputMessage,
        time: Date.now(),
      },
    };

    await setDoc(doc(db, "userMessages", `${newDocId}`), data, { merge: true });
    getTwoUserMessages();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="flex flex-col bg-white p-4 rounded-3xl shadow-xl w-[600px] h-[600px] text-center">
        <div className="flex">
          <div onClick={() => setWriteModal(false)}>
            <button className="me-1 bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-800 transition">
              {"<"}
            </button>
          </div>
          <div className="w-full flex items-center justify-center p-2 bg-blue-600 text-white rounded-xl">
            <h2 className="text-md font-semibold">{receivingUser.userName}</h2>
          </div>
        </div>
        <div className="flex flex-col py-4 h-[500px] overflow-y-auto md:px-4 mb-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {messages.length !== 0 ? (
            messages
              .sort((a: any, b: any) => a.key - b.key)
              .map((item: any, index: number) => {
                const isSender = item.senderId === sendingUser.userId;
                return <Imessage key={index} item={item} isSender={isSender} />;
              })
          ) : (
            <div className="h-full text-lg flex justify-center items-center text-gray-400">
              <p>Пусто</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSubmitSendMessage}
          className="bg-white flex items-center"
        >
          <input
            type="text"
            placeholder="Написать..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userInputMessage}
            onChange={(e) => setUserInputMessage(e.target.value)}
          />
          <button
            type={"submit"}
            className="ms-2 bg-blue-500 text-white px-3 py-2 rounded-xl hover:bg-blue-800 transition"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserWriteFunction;
