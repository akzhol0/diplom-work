import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/context";

const UserMessagesComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any>([]);

  const { allUsersMessages, userInfo } = useContext(contextData);

  const getUserMessages = async () => {
    allUsersMessages.map((item: any) => {
      if (item.id.includes(userInfo.userId)) {
        setMessages((prev: any) => [...prev, item]);
        console.log(item);
      }
    });
  };

  useEffect(() => {
    messages.length === 0 && getUserMessages();
  }, []);

  return (
    <div>
      <div
        className="cursor-pointer hover:underline"
        onClick={() => setIsOpen(true)}
      >
        Сообщения
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
          <div className="flex flex-col bg-white p-4 rounded-3xl shadow-xl w-[600px] h-[600px] text-center">
            <div className="flex justify-center gap-2">
              <div
                onClick={() => setIsOpen(false)}
                className={
                  "px-2 rounded-md text-white bg-red-600 cursor-pointer"
                }
              >{`<`}</div>
              <p>Сообщения</p>
            </div>
            {messages.length !== 0 &&
              messages.map((item: any) => <div>{item.sendingUserId}</div>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMessagesComp;
