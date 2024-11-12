"use client";

import React, { useContext, useEffect, useState } from "react";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import { contextData } from "@/components/context/context";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";

const EditPage = () => {
  const { userInfo, mainLanguage, checkIfUserLogged } = useContext(contextData);
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setName(userInfo.userName);
    setGender(userInfo.gender);
    setImage(userInfo.image);
  }, [userInfo]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userChangedData = {
      userName: name,
      userId: userInfo.userId,
      userLogin: userInfo.userLogin,
      userPassword: userInfo.userPassword,
      role: userInfo.role,
      gender: gender,
      image: image,
    };

    checkIfUserLogged();
    updateFirebaseData(userChangedData);

    router.push("/profile");
  };

  const updateFirebaseData = async (userChangedData: any) => {
    const referral = doc(db, "users", `${userInfo.userId}`);

    await updateDoc(referral, {
      ...userChangedData,
    });
  };

  return userInfo.length !== 0 ? (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="w-[95%] md:w-[80%] min-h-[500px] flex flex-col items-center justify-center gap-4 py-8"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col">
            <p className="text-xl">{mainLanguage.edit.nameLname}</p>
            <input
              className="w-[300px] h-[60px] border-b border-1 focus:outline-0"
              placeholder={userInfo.userName}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xl">{mainLanguage.edit.changePhoto}</p>
            <input
              className="w-[300px] h-[60px] border-b border-1 focus:outline-0"
              placeholder={mainLanguage.edit.changePhotoPlaceholder}
              type="text"
              id="image"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center gap-2 pb-4 items-center border-b">
            <p className="ps-2">{mainLanguage.loginAndRegsitration.gender}:</p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="focus:outline-0"
              name="gender"
              id="gender-select"
            >
              {mainLanguage.loginAndRegsitration.genders.map((item: any) => (
                <option key={item.local} value={item.ru}>
                  {item.local}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="max-w-[300px] text-center">{mainLanguage.edit.comment}</p>
        <div className="flex gap-3">
          <span onClick={() => router.push("/profile")}>
            <MyDangerButton>{mainLanguage.edit.btn2}</MyDangerButton>
          </span>
          <MyPrimaryButton type="submit">
            {mainLanguage.edit.btn}
          </MyPrimaryButton>
        </div>
      </form>
    </div>
  ) : (
    <LoadingUi />
  );
};

export default EditPage;
